'use strict';

const { forbiddenResponse } = require('../utils/apiResponse');

// Role hierarchy — higher index = more permissions
const ROLE_HIERARCHY = [
  'CUSTOMER',
  'SUB_ASSOCIATE',
  'ASSOCIATE',
  'MANAGER',
  'ADMIN',
  'SUPER_ADMIN',
];

const getRoleLevel = (role) => ROLE_HIERARCHY.indexOf(role);

/**
 * Authorize by allowed roles
 * @param {...string} roles - Allowed roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return forbiddenResponse(res, 'Authentication required.');
    }
    if (!roles.includes(req.user.role)) {
      return forbiddenResponse(
        res,
        `Access denied. Required: ${roles.join(' or ')}. Your role: ${req.user.role}`
      );
    }
    next();
  };
};

/**
 * Authorize by minimum role level
 * @param {string} minimumRole - Minimum role required
 */
const authorizeMinimum = (minimumRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return forbiddenResponse(res, 'Authentication required.');
    }
    const userLevel    = getRoleLevel(req.user.role);
    const requiredLevel = getRoleLevel(minimumRole);
    if (userLevel < requiredLevel) {
      return forbiddenResponse(res, `Insufficient permissions. Minimum role required: ${minimumRole}`);
    }
    next();
  };
};

/**
 * Check if user is SUPER_ADMIN or ADMIN
 */
const isAdmin = authorize('SUPER_ADMIN', 'ADMIN');

/**
 * Check if user is SUPER_ADMIN
 */
const isSuperAdmin = authorize('SUPER_ADMIN');

/**
 * Check if user is management level (SUPER_ADMIN, ADMIN, MANAGER)
 */
const isManagement = authorize('SUPER_ADMIN', 'ADMIN', 'MANAGER');

/**
 * Check if user is an Associate or higher
 */
const isAssociate = authorizeMinimum('ASSOCIATE');

/**
 * Check if resource belongs to requesting user OR user is admin
 */
const isOwnerOrAdmin = (getOwnerId) => {
  return (req, res, next) => {
    if (!req.user) return forbiddenResponse(res, 'Authentication required.');
    const adminRoles = ['SUPER_ADMIN', 'ADMIN', 'MANAGER'];
    if (adminRoles.includes(req.user.role)) return next();
    const ownerId = getOwnerId(req);
    if (ownerId && ownerId === req.user.id) return next();
    return forbiddenResponse(res, 'You do not have permission to access this resource.');
  };
};

module.exports = {
  authorize,
  authorizeMinimum,
  isAdmin,
  isSuperAdmin,
  isManagement,
  isAssociate,
  isOwnerOrAdmin,
  ROLE_HIERARCHY,
  getRoleLevel,
};
