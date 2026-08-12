'use strict';

const { validationResult } = require('express-validator');
const { validationErrorResponse } = require('../utils/apiResponse');

/**
 * Runs after express-validator chains — collects and returns errors
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map((err) => ({
      field:   err.path || err.param,
      message: err.msg,
      value:   err.value,
    }));
    return validationErrorResponse(res, formatted);
  }
  next();
};

module.exports = { validate };
