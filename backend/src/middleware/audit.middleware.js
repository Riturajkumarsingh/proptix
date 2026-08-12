'use strict';

const prisma  = require('../config/database');
const logger  = require('../utils/logger');

/**
 * Log HTTP requests (basic)
 */
const requestLogger = (req, res, next) => {
  req._startTime = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - req._startTime;
    const logData  = {
      method:   req.method,
      url:      req.originalUrl,
      status:   res.statusCode,
      duration: `${duration}ms`,
      ip:       req.ip,
      userId:   req.user?.id,
    };
    if (res.statusCode >= 400) {
      logger.warn('HTTP Request', logData);
    } else {
      logger.debug('HTTP Request', logData);
    }
  });
  next();
};

/**
 * Create an audit log entry asynchronously (fire & forget)
 * @param {Object} params
 */
const createAuditLog = async ({
  userId,
  action,
  entity,
  entityId,
  oldValues,
  newValues,
  description,
  req,
}) => {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        oldValues,
        newValues,
        description,
        ip:        req?.ip,
        userAgent: req?.headers?.['user-agent'],
      },
    });
  } catch (err) {
    logger.error('Failed to create audit log:', err);
  }
};

module.exports = { requestLogger, createAuditLog };
