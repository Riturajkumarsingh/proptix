'use strict';

/**
 * Standard API response helpers
 */

const successResponse = (res, { message = 'Success', data = null, statusCode = 200, meta = null } = {}) => {
  const response = { success: true, message };
  if (data !== null && data !== undefined) response.data = data;
  if (meta) response.meta = meta;
  return res.status(statusCode).json(response);
};

const createdResponse = (res, { message = 'Created successfully', data = null } = {}) => {
  return successResponse(res, { message, data, statusCode: 201 });
};

const paginatedResponse = (res, { message = 'Success', data, page, limit, total } = {}) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    meta: {
      page:       parseInt(page),
      limit:      parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
      hasNext:    page * limit < total,
      hasPrev:    page > 1,
    },
  });
};

const errorResponse = (res, { message = 'Something went wrong', statusCode = 500, errors = null } = {}) => {
  const response = { success: false, message };
  if (errors) response.errors = errors;
  return res.status(statusCode).json(response);
};

const notFoundResponse = (res, message = 'Resource not found') => {
  return errorResponse(res, { message, statusCode: 404 });
};

const unauthorizedResponse = (res, message = 'Unauthorized') => {
  return errorResponse(res, { message, statusCode: 401 });
};

const forbiddenResponse = (res, message = 'Forbidden — insufficient permissions') => {
  return errorResponse(res, { message, statusCode: 403 });
};

const validationErrorResponse = (res, errors) => {
  return res.status(422).json({
    success: false,
    message: 'Validation failed',
    errors,
  });
};

/**
 * Parse pagination params from request query
 */
const getPagination = (query) => {
  const page  = Math.max(1, parseInt(query.page)  || 1);
  const limit = Math.min(100, parseInt(query.limit) || 20);
  const skip  = (page - 1) * limit;
  return { page, limit, skip };
};

/**
 * Parse sort params from request query
 * e.g. ?sort=createdAt&order=desc
 */
const getOrderBy = (query, allowedFields = []) => {
  const field = query.sort || 'createdAt';
  const dir   = query.order === 'asc' ? 'asc' : 'desc';
  if (allowedFields.length && !allowedFields.includes(field)) {
    return { createdAt: 'desc' };
  }
  return { [field]: dir };
};

module.exports = {
  successResponse,
  createdResponse,
  paginatedResponse,
  errorResponse,
  notFoundResponse,
  unauthorizedResponse,
  forbiddenResponse,
  validationErrorResponse,
  getPagination,
  getOrderBy,
};
