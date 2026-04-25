/**
 * POST /api/diagnose
 *
 * Diagnoses crop diseases from:
 *   (a) A base64-encoded image  — send { image, mediaType, lang }
 *   (b) A named sample crop     — send { sampleCrop: 'wheat'|'tomato'|'rice', lang }
 *
 * Returns a JSON diagnosis object:
 * {
 *   disease, scientific, crop, severity, confidence,
 *   description, chemical, organic, prevention, urgent
 * }
 *
 * Rate limit: 15 requests / IP / minute
 */

'use strict';

const { rateLimit, getClientIp } = require('./_lib/ratelimit');
const { callAnthropic, extractJson } = require('./_lib/anthropic');

// ── System Prompt ────────────────────────────────────────────────────────────
const DIAG_SYSTEM = `You are CropSense AI, a helpful and practical agricultural advisor for Indian farmers.
Respond ONLY with valid JSON — no markdown, no backticks, no prose.
IMPORTANT: Use extremely simple, easy-to-understand language. Avoid complex scientific jargon. State treatments in practical farmer terms (e.g., 'Mix 1ml in 1 litre of water and spray' instead of '0.1% EC'). Explain diseases using visual, daily words rather than technical terms.

JSON schema (all fields required):
{
  "disease":     "Common local disease name (e.g., Peela Ratuwa / Yellow Rust) or 'Healthy'",
  "scientific":  "Scientific name or 'N/A'",
  "crop":        "Crop name",
  "severity":    "Healthy | Low | Medium | High | Critical",
  "confidence":  0-100,
  "description": "2-3 simple sentences describing what it looks like and the impact",
  "chemical":    "Chemical treatment with practical dosage (ml/litre water)",
  "organic":     "Simple organic / biological alternative treatment",
  "prevention":  "1-2 practical prevention tips for next season",
  "urgent":      true | false
}`;

// ── Sample crop prompts (no image needed) ────────────────────────────────────
const SAMPLE_PROMPTS = {
  wheat:  'Analyse a wheat leaf showing yellow-orange stripe patterns (powdery pustules) along the veins — classic Yellow Rust symptoms. Return a realistic diagnosis JSON.',
  tomato: 'Analyse a tomato leaf showing dark water-soaked lesions with white sporulation on the underside and brown stem cankers — classic Late Blight symptoms. Return a realistic diagnosis JSON.',
  rice:   'Analyse a rice leaf showing diamond-shaped lesions with grey centres, brown borders, and some neck blast — classic Rice Blast symptoms. Return a realistic diagnosis JSON.',
};

// ── Main handler ─────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  // 1. CORS
  res.setHeader('Access-Control-Allow-Origin',  process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options',       'nosniff');
  res.setHeader('X-Frame-Options',              'DENY');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  // 2. Rate limiting
  const ip = getClientIp(req);
  const { limited, remaining } = rateLimit(ip, { max: 15, windowMs: 60_000 });
  res.setHeader('X-RateLimit-Remaining', remaining);

  if (limited) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment before trying again.',
      code:  'RATE_LIMITED',
    });
  }

  // 3. Parse & validate body
  const { image, mediaType, sampleCrop, lang = 'en' } = req.body || {};

  let messages;

  if (sampleCrop) {
    // Text-based sample diagnosis
    const prompt = SAMPLE_PROMPTS[sampleCrop.toLowerCase()];
    if (!prompt) return res.status(400).json({ error: `Unknown sampleCrop: ${sampleCrop}` });
    messages = [{ role: 'user', content: prompt }];

  } else if (image) {
    // Image-based diagnosis
    if (!mediaType || !mediaType.startsWith('image/')) {
      return res.status(400).json({ error: 'mediaType must be a valid image MIME type' });
    }
    // Guard against oversized payloads (~5 MB image = ~6.8 MB base64)
    if (image.length > 7_000_000) {
      return res.status(413).json({ error: 'Image too large. Please resize to under 5 MB and try again.' });
    }
    messages = [{
      role: 'user',
      content: [
        { type: 'image', source: { type: 'base64', media_type: mediaType, data: image } },
        { type: 'text',  text: 'Analyse this crop photo for diseases or nutrient deficiencies. Return a JSON diagnosis.' },
      ],
    }];

  } else {
    return res.status(400).json({ error: 'Provide either `image` (base64) or `sampleCrop` in the request body.' });
  }

  // 4. Language system-prompt suffix
  const langSuffix = lang === 'hi'
    ? ' Always respond in Hindi (Devanagari script) for all descriptive fields. Keep disease names, scientific names, and chemical product names in English.'
    : '';

  // 5. Call Anthropic
  try {
    const data   = await callAnthropic({ task: 'vision', system: DIAG_SYSTEM + langSuffix, messages, maxTokens: 900 });
    const result = extractJson(data);

    // Ensure required fields exist
    const safe = {
      disease:     result.disease     || 'Unknown',
      scientific:  result.scientific  || 'N/A',
      crop:        result.crop        || 'Unknown',
      severity:    result.severity    || 'Medium',
      confidence:  result.confidence  ?? 80,
      description: result.description || '',
      chemical:    result.chemical    || '',
      organic:     result.organic     || '',
      prevention:  result.prevention  || '',
      urgent:      !!result.urgent,
    };

    return res.status(200).json(safe);

  } catch (err) {
    console.error('[/api/diagnose] Error:', err.message);

    if (err.message?.includes('ANTHROPIC_API_KEY')) {
      return res.status(500).json({ error: 'Server API key not configured.', code: 'NO_API_KEY' });
    }
    if (err.status === 429) {
      return res.status(429).json({ error: 'AI service rate limit reached. Try again shortly.', code: 'UPSTREAM_RATE_LIMIT' });
    }
    if (err.name === 'TimeoutError') {
      return res.status(504).json({ error: 'AI service timed out. Please try again.', code: 'TIMEOUT' });
    }

    return res.status(502).json({ error: 'AI service temporarily unavailable.', code: 'UPSTREAM_ERROR' });
  }
};
