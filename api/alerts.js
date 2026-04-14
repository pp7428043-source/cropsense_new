/**
 * POST /api/alerts
 *
 * Generates dynamic crop disease alerts based on real weather data.
 * Body: { weather: { temp, humidity, wind, month }, lang: 'en'|'hi' }
 * Returns: { alerts: [...] }
 *
 * Rate limit: 10 requests / IP / minute (heavy endpoint)
 */

'use strict';

const { rateLimit, getClientIp } = require('./_lib/ratelimit');
const { callAnthropic, extractJson } = require('./_lib/anthropic');

const FALLBACK_ALERTS = [
  {
    title:    'Yellow Rust — Wheat',
    detail:   'New virulent strain Race 78A detected in Madhya Pradesh. Act within 48h — spray Propiconazole 25% EC at 0.1%.',
    location: 'Indore district · MP',
    severity: 'High',
    icon:     'fa-exclamation-triangle',
    action:   'Read guide',
  },
  {
    title:    'Late Blight Risk — Tomato',
    detail:   'Leaf wetness forecast >10h over next 4 days. Apply Mancozeb 75% WP at 2.5g/L preventively.',
    location: 'MP Region',
    severity: 'High',
    icon:     'fa-virus',
    action:   'Treatment plan',
  },
  {
    title:    'Fall Armyworm — Maize',
    detail:   'FAW detected in adjacent districts. Monitor maize whorls for egg masses and early instar larvae.',
    location: 'Vidisha, Sehore',
    severity: 'Medium',
    icon:     'fa-bug',
    action:   'Learn prevention',
  },
  {
    title:    'Iron Deficiency Warning',
    detail:   'Alkaline soil pH >7.8 detected in your district. Check youngest wheat leaves for interveinal yellowing.',
    location: 'Indore district',
    severity: 'Low',
    icon:     'fa-leaf',
    action:   'View solutions',
  },
];

const ALERTS_SYSTEM = `You are CropSense AI, generating crop disease and pest risk alerts for Indian farmers. \
Respond ONLY with a valid JSON array — no markdown, no prose. 4 alert objects exactly.
Each object schema:
{
  "title":    "Disease/Pest Name — Crop",
  "detail":   "2 concise sentences with actionable advice and specific product/dosage if applicable.",
  "location": "Specific district or region, India",
  "severity": "High | Medium | Low",
  "icon":     "fa-exclamation-triangle | fa-virus | fa-bug | fa-leaf | fa-wind | fa-tint",
  "action":   "Short CTA text (2-4 words)"
}`;

module.exports = async function handler(req, res) {
  // 1. CORS + Security headers
  res.setHeader('Access-Control-Allow-Origin',  process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options',       'nosniff');
  res.setHeader('Cache-Control',                's-maxage=900, stale-while-revalidate=1800'); // Cache 15 min on CDN

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  // 2. Rate limiting (stricter for heavy LLM calls)
  const ip = getClientIp(req);
  const { limited, remaining } = rateLimit(ip, { max: 10, windowMs: 60_000 });
  res.setHeader('X-RateLimit-Remaining', remaining);

  if (limited) {
    return res.status(429).json({
      error:  'Rate limit reached. Please wait a moment.',
      alerts: FALLBACK_ALERTS, // still return usable data
      code:   'RATE_LIMITED',
    });
  }

  // 3. Validate weather payload
  const { weather = {}, lang = 'en' } = req.body || {};
  const { temp = 25, humidity = 60, wind = 10, month = new Date().toLocaleString('default', { month: 'long', year: 'numeric' }) } = weather;

  const prompt = `Location: Indore, Madhya Pradesh, India. Date: ${month}.
Current weather: Temperature ${temp}°C, Humidity ${humidity}%, Wind ${wind} km/h.
Active crops: Wheat (Rabi — heading stage), Tomato (fruiting), Maize (vegetative).
Generate 4 disease/pest risk alerts appropriate for these exact conditions.`;

  const langSuffix = lang === 'hi'
    ? ' Always write "title", "detail", "location", and "action" fields in Hindi (Devanagari). Keep disease names and chemical names in English.'
    : '';

  // 4. Call Anthropic
  try {
    const data   = await callAnthropic({ task: 'alerts', system: ALERTS_SYSTEM + langSuffix, messages: [{ role: 'user', content: prompt }], maxTokens: 800 });
    const alerts = extractJson(data);

    if (!Array.isArray(alerts) || alerts.length === 0) throw new Error('Unexpected response shape');

    return res.status(200).json({ alerts });

  } catch (err) {
    console.error('[/api/alerts] Error:', err.message, '— serving fallback alerts');
    // Always return usable data even on error
    return res.status(200).json({ alerts: FALLBACK_ALERTS, fallback: true });
  }
};
