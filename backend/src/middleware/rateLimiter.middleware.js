'use strict';

const rateLimit = require('express-rate-limit');
const { errorResponse } = require('../utils/apiResponse');

const rateLimitHandler = (req, res) => {
  return errorResponse(res, {
    message: 'Too many requests. Please try again later.',
    statusCode: 429,
  });
};

/**
 * Global rate limiter — applied to all routes
 */
const globalRateLimiter = rateLimit({
  windowMs:         parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max:              parseInt(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders:  true,
  legacyHeaders:    false,
  handler:          rateLimitHandler,
  keyGenerator:     (req) => req.ip || req.connection.remoteAddress,
});

/**
 * Strict auth rate limiter — for login/register endpoints
 */
const authRateLimiter = rateLimit({
  windowMs:        15 * 60 * 1000, // 15 minutes
  max:             parseInt(process.env.AUTH_RATE_LIMIT_MAX) || 5,
  standardHeaders: true,
  legacyHeaders:   false,
  handler:         (req, res) =>
    errorResponse(res, {
      message: 'Too many authentication attempts. Please wait 15 minutes.',
      statusCode: 429,
    }),
  skipSuccessfulRequests: true,
});

/**
 * File upload rate limiter
 */
const uploadRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max:      20,
  handler:  rateLimitHandler,
});

/**
 * API rate limiter for expensive operations
 */
const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max:      60,
  handler:  rateLimitHandler,
});

module.exports = {
  globalRateLimiter,
  authRateLimiter,
  uploadRateLimiter,
  apiRateLimiter,
};
