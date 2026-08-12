'use strict';

/**
 * Wraps async route handlers to catch errors and pass them to Express error handler.
 * Eliminates try/catch boilerplate in every controller.
 *
 * @param {Function} fn - Async route handler
 * @returns {Function} Wrapped handler
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = catchAsync;
