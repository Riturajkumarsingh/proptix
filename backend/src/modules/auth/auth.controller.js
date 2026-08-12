'use strict';

const catchAsync = require('../../utils/catchAsync');
const { successResponse, createdResponse, errorResponse } = require('../../utils/apiResponse');
const { getRefreshCookieOptions } = require('../../config/jwt');
const authService = require('./auth.service');

// ── Register ──────────────────────────────────────────────────────────────────
const register = catchAsync(async (req, res) => {
  const user = await authService.register(req.body, req);
  return createdResponse(res, {
    message: 'Account created successfully. Welcome!',
    data:    { user },
  });
});

// ── Login ─────────────────────────────────────────────────────────────────────
const login = catchAsync(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body, req);

  // Set refresh token in HTTP-only cookie
  res.cookie('refreshToken', refreshToken, getRefreshCookieOptions());

  return successResponse(res, {
    message: `Welcome back, ${user.name}!`,
    data: { user, accessToken },
  });
});

// ── Refresh Token ─────────────────────────────────────────────────────────────
const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies?.refreshToken;
  const { accessToken, refreshToken: newRefreshToken } = await authService.refreshToken(token);

  res.cookie('refreshToken', newRefreshToken, getRefreshCookieOptions());

  return successResponse(res, {
    message: 'Token refreshed successfully',
    data:    { accessToken },
  });
});

// ── Logout ────────────────────────────────────────────────────────────────────
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.user.id, req);

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    path:     '/api/v1/auth',
  });

  return successResponse(res, { message: 'Logged out successfully' });
});

// ── Forgot Password ───────────────────────────────────────────────────────────
const forgotPassword = catchAsync(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  return successResponse(res, {
    message: 'If an account with that email exists, a reset link has been sent.',
  });
});

// ── Reset Password ────────────────────────────────────────────────────────────
const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.body);
  return successResponse(res, { message: 'Password reset successfully. Please log in.' });
});

// ── Change Password ───────────────────────────────────────────────────────────
const changePassword = catchAsync(async (req, res) => {
  await authService.changePassword(req.user.id, req.body);
  return successResponse(res, { message: 'Password changed successfully.' });
});

// ── Get Me ────────────────────────────────────────────────────────────────────
const getMe = catchAsync(async (req, res) => {
  const user = await authService.getMe(req.user.id);
  return successResponse(res, { data: { user } });
});

module.exports = { register, login, refreshToken, logout, forgotPassword, resetPassword, changePassword, getMe };
