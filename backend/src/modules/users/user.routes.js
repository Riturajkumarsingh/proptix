'use strict';

const express = require('express');
const router  = express.Router();

const { authenticate } = require('../../middleware/auth.middleware');
const { isAdmin, isManagement, authorize } = require('../../middleware/rbac.middleware');
const { validate } = require('../../middleware/validate.middleware');
const userController = require('./user.controller');

// All user routes require authentication
router.use(authenticate);

// ── Profile ────────────────────────────────────────────────────────────────────
router.get('/profile',           userController.getProfile);
router.patch('/profile',         userController.updateProfile);

// ── Admin: User Management ─────────────────────────────────────────────────────
router.get('/',                  isManagement, userController.getAllUsers);
router.post('/',                 isAdmin,      userController.createUser);
router.get('/:id',               isManagement, userController.getUserById);
router.patch('/:id',             isAdmin,      userController.updateUser);
router.patch('/:id/status',      isAdmin,      userController.updateUserStatus);
router.delete('/:id',            isAdmin,      userController.deleteUser);

module.exports = router;
