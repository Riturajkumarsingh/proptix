'use strict';

const logger = require('../utils/logger');

/**
 * Global Express error handler
 * Must be registered LAST as middleware
 */
const errorHandler = (err, req, res, next) => {  // eslint-disable-line no-unused-vars
  let statusCode = err.statusCode || err.status || 500;
  let message    = err.message || 'Internal Server Error';

  // ── Prisma Error Handling ─────────────────────────────────────────────────
  if (err.code === 'P2002') {
    // Unique constraint violation
    statusCode = 409;
    const field = err.meta?.target?.join(', ') || 'field';
    message = `${field} already exists. Please use a different value.`;
  } else if (err.code === 'P2025') {
    // Record not found
    statusCode = 404;
    message = 'Record not found.';
  } else if (err.code === 'P2003') {
    // Foreign key constraint
    statusCode = 400;
    message = 'Referenced record does not exist.';
  } else if (err.code === 'P2014') {
    statusCode = 400;
    message = 'Invalid relation data.';
  }

  // ── JWT Error Handling ────────────────────────────────────────────────────
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please log in again.';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired. Please log in again.';
  }

  // ── Multer Error Handling ────────────────────────────────────────────────
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 413;
    message = `File too large. Maximum allowed size is ${Math.round(parseInt(process.env.MAX_FILE_SIZE || 10485760) / (1024 * 1024))}MB.`;
  } else if (err.code === 'LIMIT_FILE_COUNT') {
    statusCode = 400;
    message = 'Too many files uploaded.';
  } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    statusCode = 400;
    message = 'Unexpected file field.';
  }

  // ── CORS Error ────────────────────────────────────────────────────────────
  if (err.message?.includes('CORS')) {
    statusCode = 403;
    message = 'CORS: Origin not allowed.';
  }

  // Log server errors
  if (statusCode >= 500) {
    logger.error(`[${statusCode}] ${message}`, {
      url:    req.originalUrl,
      method: req.method,
      ip:     req.ip,
      stack:  err.stack,
    });
  } else {
    logger.warn(`[${statusCode}] ${message}`, { url: req.originalUrl, method: req.method });
  }

  const response = {
    success: false,
    message,
  };

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};

/**
 * Custom AppError class
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { errorHandler, AppError };
