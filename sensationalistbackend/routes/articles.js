// routes/artices.js 
const express = require('express');
const multer = require('multer');
const { Article } = require('../database');
const path = require('path');


const router = express.Router();

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Create a new article with file upload
/*
curl -X POST http://localhost:5000/api/articles \
  -F "title=The Sensationalist Issue #3" \
  -F "description=The Eternal Tunnel: A Temporary Psychosis Story, No-Smell, Cheap, Easy, Snacks, Stand-up, A Netherlands Triptych, Ginkgos Galore!,  O.A.R. Project Update" \
  -F "pdf=@C:/Users/linco/Desktop/Past Issues/The_Sensationalist_3.pdf" \
  -F "filetype=Issue" \
  -F "viewcount=0" \
  -F "downloadcount=0"
*/
router.post('/', upload.single('pdf'), async (req, res) => {


  try {
    const article = await Article.create({
      title: req.body.title,
      description: req.body.description,
      pdfPath: req.file ? req.file.path : '',
      filetype: req.body.filetype, // New field
      viewcount: req.body.viewcount || 0, // New field, default to 0 if not provided
      downloadcount: req.body.downloadcount || 0 // New field, default to 0 if not provided
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
