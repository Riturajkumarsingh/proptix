'use strict';

const catchAsync = require('../../utils/catchAsync');
const {
  successResponse, createdResponse, paginatedResponse,
  notFoundResponse,
} = require('../../utils/apiResponse');
const userService = require('./user.service');

const getAllUsers = catchAsync(async (req, res) => {
  const { users, total, page, limit } = await userService.getAllUsers({ query: req.query });
  return paginatedResponse(res, { data: users, total, page, limit });
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  return successResponse(res, { data: { user } });
});

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body, req.user.id, req);
  return createdResponse(res, { message: 'User created successfully.', data: { user } });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body, req.user.id, req);
  return successResponse(res, { message: 'User updated successfully.', data: { user } });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const user = await userService.updateUserStatus(req.params.id, req.body.status, req.user.id, req);
  return successResponse(res, { message: `User status updated to ${req.body.status}.`, data: { user } });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id, req.user.id, req);
  return successResponse(res, { message: 'User deactivated successfully.' });
});

const getProfile = catchAsync(async (req, res) => {
  const user = await userService.getProfile(req.user.id);
  return successResponse(res, { data: { user } });
});

const updateProfile = catchAsync(async (req, res) => {
  const user = await userService.updateProfile(req.user.id, req.body);
  return successResponse(res, { message: 'Profile updated successfully.', data: { user } });
});

module.exports = {
  getAllUsers, getUserById, createUser, updateUser,
  updateUserStatus, deleteUser, getProfile, updateProfile,
};
