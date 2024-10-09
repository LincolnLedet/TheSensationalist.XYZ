const express = require('express');
const multer = require('multer');
const { Article } = require('../database');

const router = express.Router();

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Create a new article with file upload
router.post('/', upload.single('pdf'), async (req, res) => {
  try {
    const article = await Article.create({
      title: req.body.title,
      description: req.body.description,
      pdfPath: req.file ? req.file.path : ''
    });
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
