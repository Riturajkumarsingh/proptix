'use strict';

const { verifyAccessToken } = require('../config/jwt');
const { unauthorizedResponse, forbiddenResponse } = require('../utils/apiResponse');
const prisma = require('../config/database');
const logger = require('../utils/logger');

/**
 * Authenticate request via JWT Bearer token
 */
const authenticate = async (req, res, next) => {
  try {
    let token;

    // 1. Check Authorization header (Bearer token)
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return unauthorizedResponse(res, 'Authentication required. Please log in.');
    }

    // 2. Verify token
    const decoded = verifyAccessToken(token);
    if (!decoded) {
      return unauthorizedResponse(res, 'Invalid or expired token. Please log in again.');
    }

    // 3. Check user still exists and is active
    const user = await prisma.user.findUnique({
      where:  { id: decoded.id },
      select: {
        id:       true,
        name:     true,
        email:    true,
        phone:    true,
        role:     true,
        status:   true,
        avatar:   true,
        associate: { select: { id: true, associateCode: true, commissionRate: true, parentId: true } },
        customer:  { select: { id: true, customerCode: true } },
      },
    });

    if (!user) {
      return unauthorizedResponse(res, 'User no longer exists.');
    }

    if (user.status !== 'ACTIVE') {
      return forbiddenResponse(res, `Your account is ${user.status.toLowerCase()}. Please contact support.`);
    }

    req.user = user;
    next();
  } catch (err) {
    logger.error('Auth middleware error:', err);
    return unauthorizedResponse(res, 'Authentication failed.');
  }
};

/**
 * Optional authentication — attach user if token present, but don't block
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
      const decoded = verifyAccessToken(token);
      if (decoded) {
        const user = await prisma.user.findUnique({
          where:  { id: decoded.id },
          select: { id: true, name: true, email: true, role: true, status: true },
        });
        if (user && user.status === 'ACTIVE') {
          req.user = user;
        }
      }
    }
    next();
  } catch {
    next();
  }
};

module.exports = { authenticate, optionalAuth };
