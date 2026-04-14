/**
 * CropSense — Enterprise Rate Limiter
 * In-memory token-bucket rate limiter for Vercel serverless functions.
 * NOTE: State resets on cold starts. For persistent rate limiting across
 * instances, use Upstash Redis (see README).
 */

'use strict';

const store = new Map();

/**
 * @param {string} ip        — Requester IP address
 * @param {object} options
 * @param {number} options.windowMs   — Rolling window in ms (default 60 000)
 * @param {number} options.max        — Max requests per window (default 20)
 * @returns {{ limited: boolean, remaining: number, resetAt: number }}
 */
function rateLimit(ip, { windowMs = 60_000, max = 20 } = {}) {
  const now = Date.now();
  const key = ip || 'unknown';

  let entry = store.get(key);

  if (!entry || now > entry.reset) {
    entry = { count: 0, reset: now + windowMs };
  }

  entry.count += 1;
  store.set(key, entry);

  const remaining = Math.max(0, max - entry.count);
  const limited = entry.count > max;

  return { limited, remaining, resetAt: entry.reset };
}

/**
 * Extract the real client IP from a Vercel request.
 * Handles Cloudflare, AWS ALB, and plain X-Forwarded-For headers.
 * @param {import('http').IncomingMessage} req
 * @returns {string}
 */
function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return fwd.split(',')[0].trim();
  const cfIp = req.headers['cf-connecting-ip'];
  if (cfIp) return cfIp;
  return req.socket?.remoteAddress || 'unknown';
}

module.exports = { rateLimit, getClientIp };
