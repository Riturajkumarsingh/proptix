'use strict';

const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

/**
 * Generate a unique code with prefix
 * @param {string} prefix - e.g., 'ASC', 'CUS', 'BKG'
 * @param {number} digits  - Number of random digits
 */
const generateCode = (prefix = '', digits = 6) => {
  const random = Math.floor(Math.random() * Math.pow(10, digits))
    .toString()
    .padStart(digits, '0');
  const ts = Date.now().toString().slice(-4);
  return `${prefix}${ts}${random}`.toUpperCase();
};

/**
 * Generate a unique slug from a string
 */
const generateSlug = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Generate a unique slug with UUID suffix to ensure uniqueness
 */
const generateUniqueSlug = (str) => {
  return `${generateSlug(str)}-${uuidv4().split('-')[0]}`;
};

/**
 * Generate cryptographically secure random token
 */
const generateSecureToken = (bytes = 32) => {
  return crypto.randomBytes(bytes).toString('hex');
};

/**
 * Hash a token for storage
 */
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * Sanitize object — remove null/undefined keys
 */
const sanitize = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== '')
  );
};

/**
 * Pick specific keys from an object
 */
const pick = (obj, keys) => {
  return keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

/**
 * Omit specific keys from an object
 */
const omit = (obj, keys) => {
  const result = { ...obj };
  keys.forEach((k) => delete result[k]);
  return result;
};

/**
 * Format number as Indian currency
 */
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style:    'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculate EMI (Equal Monthly Installment)
 * @param {number} principal - Loan amount
 * @param {number} rate      - Annual interest rate (%)
 * @param {number} months    - Tenure in months
 */
const calculateEMI = (principal, rate, months) => {
  if (rate === 0) return principal / months;
  const monthlyRate = rate / (12 * 100);
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months))
    / (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
};

/**
 * Build Prisma search filter for string fields
 */
const buildSearchFilter = (search, fields) => {
  if (!search) return {};
  return {
    OR: fields.map((field) => ({
      [field]: { contains: search, mode: 'insensitive' },
    })),
  };
};

/**
 * Parse boolean from query string
 */
const parseBoolean = (val) => {
  if (val === 'true' || val === true) return true;
  if (val === 'false' || val === false) return false;
  return undefined;
};

/**
 * Calculate token expiry date
 */
const getTokenExpiry = (minutes = 30) => {
  return new Date(Date.now() + minutes * 60 * 1000);
};

module.exports = {
  generateCode,
  generateSlug,
  generateUniqueSlug,
  generateSecureToken,
  hashToken,
  sanitize,
  pick,
  omit,
  formatCurrency,
  calculateEMI,
  buildSearchFilter,
  parseBoolean,
  getTokenExpiry,
};
