'use strict';

require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const { corsOptions } = require('./src/config/cors');
const { initSocket } = require('./src/sockets');
const { globalRateLimiter } = require('./src/middleware/rateLimiter.middleware');
const { errorHandler } = require('./src/middleware/errorHandler.middleware');
const { requestLogger } = require('./src/middleware/audit.middleware');
const logger = require('./src/utils/logger');
const prisma = require('./src/config/database');

// ── Route Imports ─────────────────────────────────────────────────────────────
const authRoutes        = require('./src/modules/auth/auth.routes');
const userRoutes        = require('./src/modules/users/user.routes');

// ── App Init ──────────────────────────────────────────────────────────────────
const app = express();
const server = http.createServer(app);

// ── Trust Proxy (Required for Vercel + Rate Limiting) ─────────────────────────
app.set('trust proxy', 1);

// ── Socket.IO (Disabled for Vercel) ───────────────────────────────────────────
// initSocket(server);

// ── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com'],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

app.use(cors(corsOptions));
app.use(globalRateLimiter);

// ── Body Parsing Middleware ───────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());

// ── Request Logging ───────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', {
    stream: { write: (message) => logger.http(message.trim()) },
    skip: (req) => req.url === '/health',
  }));
}
app.use(requestLogger);

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.API_VERSION || 'v1',
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
const API_PREFIX = `/api/${process.env.API_VERSION || 'v1'}`;

app.use(`${API_PREFIX}/auth`,         authRoutes);
app.use(`${API_PREFIX}/users`,        userRoutes);

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use(errorHandler);

// ── Server Start ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test DB connection
    await prisma.$connect();
    logger.info('✅ Database connected successfully');

    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
      logger.info(`📡 API Base: http://localhost:${PORT}/api/${process.env.API_VERSION || 'v1'}`);
      logger.info(`❤️  Health: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

// ── Graceful Shutdown ─────────────────────────────────────────────────────────
const shutdown = async (signal) => {
  logger.info(`\n${signal} received. Graceful shutdown initiated...`);
  server.close(async () => {
    await prisma.$disconnect();
    logger.info('✅ Database disconnected. Server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));

process.on('uncaughtException', (err) => {
  logger.error('💥 Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('💥 Unhandled Rejection:', reason);
  process.exit(1);
});

if (require.main === module) {
  startServer();
}

module.exports = app;
