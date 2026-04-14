/**
 * CropSense — Shared Anthropic API Client
 * Central wrapper for all calls to the Anthropic Messages API.
 * Never exposed to the client — server-side only.
 */

'use strict';

const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION  = '2023-06-01';

// Models to use per task type (cost vs. quality trade-off)
const MODELS = {
  vision:  'claude-sonnet-4-20250514', // Image diagnosis — needs vision + high accuracy
  chat:    'claude-haiku-4-5',         // Chat — speed & low latency
  alerts:  'claude-haiku-4-5',         // Alert generation — structured JSON output
};

/**
 * Call the Anthropic Messages API.
 *
 * @param {object} params
 * @param {'vision'|'chat'|'alerts'} params.task   — Which model to use
 * @param {string}                   params.system  — System prompt
 * @param {Array}                    params.messages — Conversation history
 * @param {number}                   [params.maxTokens=800]
 * @returns {Promise<object>}  — Parsed Anthropic response body
 * @throws  {Error}            — On non-200 status or network failure
 */
async function callAnthropic({ task = 'chat', system, messages, maxTokens = 800 }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY environment variable is not set.');

  const response = await fetch(ANTHROPIC_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type':      'application/json',
      'x-api-key':         apiKey,
      'anthropic-version': ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model:      MODELS[task] || MODELS.chat,
      max_tokens: maxTokens,
      system,
      messages,
    }),
    // Node 18+ fetch supports AbortSignal — abort after 25 s (Vercel limit is 30 s)
    signal: AbortSignal.timeout(25_000),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const msg  = body?.error?.message || `HTTP ${response.status}`;
    const err  = new Error(`Anthropic API error: ${msg}`);
    err.status = response.status;
    throw err;
  }

  return response.json();
}

/**
 * Extract the plain-text content from an Anthropic response.
 * @param {object} data — Raw Anthropic response body
 * @returns {string}
 */
function extractText(data) {
  return (data.content || [])
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('');
}

/**
 * Extract and parse the first JSON object from an Anthropic text response.
 * Strips markdown code fences before parsing.
 * @param {object} data
 * @returns {object}
 */
function extractJson(data) {
  const txt   = extractText(data).replace(/```json|```/g, '').trim();
  const match = txt.match(/\{[\s\S]*\}/) || txt.match(/\[[\s\S]*\]/);
  if (!match) throw new Error('No JSON found in Anthropic response');
  return JSON.parse(match[0]);
}

module.exports = { callAnthropic, extractText, extractJson };
