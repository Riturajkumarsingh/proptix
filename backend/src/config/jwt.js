'use strict';

const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const ACCESS_SECRET  = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRY  = process.env.JWT_ACCESS_EXPIRES_IN  || '15m';
const REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

/**
 * Generate JWT access token
 */
const generateAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRY,
    issuer: 'realstate-api',
    audience: 'realstate-client',
  });
};

/**
 * Generate JWT refresh token
 */
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRY,
    issuer: 'realstate-api',
    audience: 'realstate-client',
  });
};

/**
 * Generate both tokens
 */
const generateTokenPair = (user) => {
  const payload = {
    id:    user.id,
    email: user.email,
    role:  user.role,
  };
  return {
    accessToken:  generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

/**
 * Verify access token
 */
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_SECRET, {
      issuer:   'realstate-api',
      audience: 'realstate-client',
    });
  } catch (err) {
    logger.warn('Invalid access token:', err.message);
    return null;
  }
};

/**
 * Verify refresh token
 */
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET, {
      issuer:   'realstate-api',
      audience: 'realstate-client',
    });
  } catch (err) {
    logger.warn('Invalid refresh token:', err.message);
    return null;
  }
};

/**
 * Cookie options for refresh token
 */
const getRefreshCookieOptions = () => ({
  httpOnly:  true,
  secure:    process.env.NODE_ENV === 'production',
  sameSite:  process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge:    parseInt(process.env.JWT_COOKIE_EXPIRES_IN || '7') * 24 * 60 * 60 * 1000,
  path:      '/api/v1/auth',
});

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokenPair,
  verifyAccessToken,
  verifyRefreshToken,
  getRefreshCookieOptions,
};
