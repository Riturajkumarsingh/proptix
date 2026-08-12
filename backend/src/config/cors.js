'use strict';

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim().replace(/\/$/, ''));

const corsOptions = {
  origin: true, // Allow all origins dynamically (mirrors the incoming origin)
  credentials:         true,
  methods:             ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders:      ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With'],
  exposedHeaders:      ['X-Total-Count', 'X-Page', 'X-Per-Page'],
  preflightContinue:   false,
  optionsSuccessStatus: 204,
};

module.exports = { corsOptions, allowedOrigins };
