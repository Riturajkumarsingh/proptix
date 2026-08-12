'use strict';

const multer = require('multer');
const path = require('path');
const { AppError } = require('./errorHandler.middleware');

const MAX_FILE_SIZE    = parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024; // 10MB
const MAX_FILES        = parseInt(process.env.MAX_FILES) || 10;

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_DOC_TYPES   = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ALLOWED_ALL_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOC_TYPES];

// ── Memory Storage (upload to Cloudinary from buffer) ────────────────────────
const memoryStorage = multer.memoryStorage();

// ── File Filter Factory ────────────────────────────────────────────────────
const createFileFilter = (allowedTypes) => (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        `Invalid file type: ${file.mimetype}. Allowed: ${allowedTypes.join(', ')}`,
        400
      ),
      false
    );
  }
};

// ── Multer Instances ──────────────────────────────────────────────────────────

/** Single image upload */
const uploadImage = multer({
  storage:    memoryStorage,
  limits:     { fileSize: MAX_FILE_SIZE },
  fileFilter: createFileFilter(ALLOWED_IMAGE_TYPES),
});

/** Multiple images */
const uploadImages = multer({
  storage:    memoryStorage,
  limits:     { fileSize: MAX_FILE_SIZE, files: MAX_FILES },
  fileFilter: createFileFilter(ALLOWED_IMAGE_TYPES),
});

/** Document upload (PDF, Word) */
const uploadDocument = multer({
  storage:    memoryStorage,
  limits:     { fileSize: MAX_FILE_SIZE },
  fileFilter: createFileFilter(ALLOWED_DOC_TYPES),
});

/** Mixed — images + documents */
const uploadMixed = multer({
  storage:    memoryStorage,
  limits:     { fileSize: MAX_FILE_SIZE, files: MAX_FILES },
  fileFilter: createFileFilter(ALLOWED_ALL_TYPES),
});

module.exports = {
  uploadImage,
  uploadImages,
  uploadDocument,
  uploadMixed,
};
