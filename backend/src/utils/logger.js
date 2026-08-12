'use strict';

const winston = require('winston');
const path = require('path');
const fs = require('fs-extra');

const LOG_DIR = process.env.LOG_DIR || 'logs';
fs.ensureDirSync(LOG_DIR);

const { combine, timestamp, errors, printf, colorize, json } = winston.format;

// ── Custom Log Format (Console) ───────────────────────────────────────────────
const consoleFormat = printf(({ level, message, timestamp: ts, stack, ...meta }) => {
  const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
  return `${ts} [${level}]: ${stack || message}${metaStr}`;
});

// ── Custom Log Format (File) ──────────────────────────────────────────────────
const fileFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }),
  json()
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: { service: 'realstate-api' },
  transports: [
    // Error log file
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'error.log'),
      level:    'error',
      format:   fileFormat,
      maxsize:  10 * 1024 * 1024, // 10MB
      maxFiles: 5,
    }),
    // Combined log file
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'combined.log'),
      format:   fileFormat,
      maxsize:  20 * 1024 * 1024, // 20MB
      maxFiles: 10,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'exceptions.log'),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'rejections.log'),
    }),
  ],
});

// ── Console Transport (dev only) ──────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'HH:mm:ss' }),
        errors({ stack: true }),
        consoleFormat
      ),
    })
  );
}

// Add HTTP level
winston.addColors({ http: 'magenta' });

module.exports = logger;
