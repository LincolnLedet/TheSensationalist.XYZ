const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Function to sanitize filenames
const sanitizeFileName = (filename) => {
  return filename
    .toLowerCase()
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/[^a-z0-9_.-]/g, ''); // Remove special characters except _ . -
};

// Storage engine setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';
    if (file.mimetype.startsWith('image/')) uploadPath += 'images/';
    if (file.mimetype.startsWith('audio/')) uploadPath += 'tracks/';
    const fullPath = path.join(__dirname, '..', uploadPath);
    fs.mkdirSync(fullPath, { recursive: true });
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const sanitized = sanitizeFileName(name) + ext;
    // Append Date.now() and a random number for extra uniqueness
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + '-' + sanitized);
  }
});

// File filter for allowed file types
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'audioFile' && file.mimetype !== 'audio/mpeg') {
    return cb(new Error('Only MP3 files are allowed for audio uploads'), false);
  }
  if (
    (file.fieldname === 'photo' || file.fieldname === 'landingImage') &&
    !['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)
  ) {
    return cb(new Error('Only JPEG and PNG images are allowed for photos'), false);
  }
  cb(null, true);
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 128 * 1024 * 1024 }, // Max file size: 128MB
});

module.exports = upload;
