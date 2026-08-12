'use strict';

const { Server } = require('socket.io');
const { verifyAccessToken } = require('../config/jwt');
const prisma = require('../config/database');
const logger = require('../utils/logger');

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin:      (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(','),
      credentials: true,
    },
    pingTimeout:  60000,
    pingInterval: 25000,
  });

  // ── Auth Middleware ─────────────────────────────────────────────────────────
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];
      if (!token) return next(new Error('Authentication required'));

      const decoded = verifyAccessToken(token);
      if (!decoded) return next(new Error('Invalid token'));

      const user = await prisma.user.findUnique({
        where:  { id: decoded.id },
        select: { id: true, name: true, role: true, status: true },
      });

      if (!user || user.status !== 'ACTIVE') return next(new Error('User not found or inactive'));

      socket.user = user;
      next();
    } catch (err) {
      next(new Error('Authentication failed'));
    }
  });

  // ── Connection Handler ─────────────────────────────────────────────────────
  io.on('connection', (socket) => {
    const user = socket.user;
    logger.info(`Socket connected: ${user.name} (${user.role}) [${socket.id}]`);

    // Join personal room for targeted notifications
    socket.join(`user:${user.id}`);

    // Join role-based room
    socket.join(`role:${user.role}`);

    // Admins join admin room
    if (['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(user.role)) {
      socket.join('room:admins');
    }

    // ── Events ──────────────────────────────────────────────────────────────
    socket.on('join:room', (room) => {
      socket.join(room);
      logger.debug(`${user.name} joined room: ${room}`);
    });

    socket.on('leave:room', (room) => {
      socket.leave(room);
    });

    socket.on('disconnect', (reason) => {
      logger.info(`Socket disconnected: ${user.name} [${socket.id}] — ${reason}`);
    });
  });

  logger.info('✅ Socket.IO initialized');
  return io;
};

/**
 * Emit notification to a specific user
 */
const emitToUser = (userId, event, data) => {
  if (!io) return;
  io.to(`user:${userId}`).emit(event, data);
};

/**
 * Emit to all admins
 */
const emitToAdmins = (event, data) => {
  if (!io) return;
  io.to('room:admins').emit(event, data);
};

/**
 * Emit to all connected clients
 */
const emitBroadcast = (event, data) => {
  if (!io) return;
  io.emit(event, data);
};

/**
 * Send and persist notification
 */
const sendNotification = async ({ userId, type, title, message, data, actionUrl }) => {
  try {
    const notification = await prisma.notification.create({
      data: { userId, type, title, message, data, actionUrl },
    });
    emitToUser(userId, 'notification:new', notification);
    return notification;
  } catch (err) {
    logger.error('Send notification error:', err);
  }
};

const getIO = () => io;

module.exports = { initSocket, emitToUser, emitToAdmins, emitBroadcast, sendNotification, getIO };
