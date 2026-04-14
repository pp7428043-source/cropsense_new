/**
 * POST /api/chat
 *
 * Multi-turn agricultural AI chat.
 * Body: { messages: [{role, content}], lang: 'en'|'hi' }
 * Returns: { reply: string }
 *
 * Rate limit: 30 messages / IP / minute
 */

'use strict';

const { rateLimit, getClientIp } = require('./_lib/ratelimit');
const { callAnthropic, extractText } = require('./_lib/anthropic');

const CHAT_SYSTEM = `You are CropSense AI, a friendly and knowledgeable agricultural advisor for Indian farmers. \
You specialise in crop disease management, pest control, soil health, fertiliser application, irrigation, \
and seasonal farming practices across India.

Guidelines:
- Keep answers concise: 3–5 sentences for simple questions, up to 8 for complex ones.
- Use plain text — no markdown, no bullet points, no headers.
- Be empathetic and practical, addressing smallholder farmers directly.
- If asked about specific chemicals, always mention dosage and safety.
- If a question is outside agriculture, politely redirect to farming topics.
- Default region: Madhya Pradesh, India — but adapt to user's mentioned location.`;

const MAX_HISTORY = 20; // Trim conversation context to keep prompts manageable

module.exports = async function handler(req, res) {
  // 1. CORS + Security headers
  res.setHeader('Access-Control-Allow-Origin',  process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options',       'nosniff');
  res.setHeader('X-Frame-Options',              'DENY');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  // 2. Rate limiting
  const ip = getClientIp(req);
  const { limited, remaining } = rateLimit(ip, { max: 30, windowMs: 60_000 });
  res.setHeader('X-RateLimit-Remaining', remaining);

  if (limited) {
    return res.status(429).json({
      error: 'Chat rate limit reached. Please wait a moment.',
      code:  'RATE_LIMITED',
    });
  }

  // 3. Validate body
  const { messages, lang = 'en' } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: '`messages` must be a non-empty array.' });
  }

  // Validate each message shape to prevent prompt injection via malformed objects
  for (const msg of messages) {
    if (!msg.role || !msg.content || typeof msg.content !== 'string') {
      return res.status(400).json({ error: 'Each message must have `role` (string) and `content` (string).' });
    }
    if (!['user', 'assistant'].includes(msg.role)) {
      return res.status(400).json({ error: '`role` must be "user" or "assistant".' });
    }
    // Guard against oversized individual messages
    if (msg.content.length > 4_000) {
      return res.status(400).json({ error: 'A message exceeds the maximum allowed length.' });
    }
  }

  // Trim history to avoid excessive token cost
  const trimmedMessages = messages.slice(-MAX_HISTORY);

  // 4. Language suffix
  const langSuffix = lang === 'hi'
    ? ' Always respond in Hindi (Devanagari script). Keep chemical product names and scientific terms in English.'
    : '';

  // 5. Call Anthropic
  try {
    const data  = await callAnthropic({
      task:     'chat',
      system:   CHAT_SYSTEM + langSuffix,
      messages: trimmedMessages,
      maxTokens: 600,
    });

    const reply = extractText(data).trim();
    if (!reply) throw new Error('Empty response from AI');

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('[/api/chat] Error:', err.message);

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
