'use strict';

const express = require('express');
const router  = express.Router();

const { authenticate } = require('../../middleware/auth.middleware');
const { validate }     = require('../../middleware/validate.middleware');
const { authRateLimiter } = require('../../middleware/rateLimiter.middleware');
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
} = require('./auth.validation');
const {
  register,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  getMe,
} = require('./auth.controller');

// ── Public Routes ─────────────────────────────────────────────────────────────
router.post('/register',       authRateLimiter, registerValidation,       validate, register);
router.post('/login',          authRateLimiter, loginValidation,           validate, login);
router.post('/refresh',        refreshToken);
router.post('/forgot-password',authRateLimiter, forgotPasswordValidation,  validate, forgotPassword);
router.post('/reset-password', resetPasswordValidation, validate, resetPassword);

// ── Protected Routes ──────────────────────────────────────────────────────────
router.use(authenticate);
router.post('/logout',         logout);
router.get('/me',              getMe);
router.patch('/change-password', changePasswordValidation, validate, changePassword);

module.exports = router;
