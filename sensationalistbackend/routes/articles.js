// routes/articles.js
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const { Article, Author } = require('../database');
const path = require('path');

const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Saves the file with the original name
  }
});

const upload = multer({ storage: storage });

// Create upload handlers
const uploadMultiple = upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]);

const uploadSingle = upload.single('profileImage');

// Create a new author (requires authentication)
router.post('/authors', authenticateToken, authorizeRoles('admin', 'editor'), uploadSingle, async (req, res) => {
  try {
    const { name, bio } = req.body;
    const profileImagePath = req.file ? req.file.path : null;

    // Create the author
    const author = await Author.create({
      name,
      bio,
      profileImage: profileImagePath
    });

    // Respond with the created author
    res.status(201).json(author);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get all authors
router.get('/authors', async (req, res) => {
  try {
    const authors = await Author.findAll(); // Fetch all authors from the database
    res.json(authors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch authors.' });
  }
});

router.get('/authors/:id', async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findByPk(authorId, {
      include: [{ model: Article }] // Include articles associated with the author
    });

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Respond with the author data
    res.json(author);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch author.' });
  }
});


// Create a new article with file upload (requires authentication)
router.post('/', authenticateToken, authorizeRoles('admin', 'editor'), uploadMultiple, async (req, res) => {
  try {
    // Extract data from request body
    const { title, description, filetype, contentType, viewcount, downloadcount, authorIds } = req.body;

    // Handle uploaded files
    const pdfPath = req.files['pdf'] ? req.files['pdf'][0].path : null;
    const coverImagePath = req.files['coverImage'] ? req.files['coverImage'][0].path : null;

    // Create the article
    const article = await Article.create({
      title,
      description,
      pdfPath,
      coverImage: coverImagePath,
      contentType,
      filetype,
      viewcount: parseInt(viewcount) || 0,
      downloadcount: parseInt(downloadcount) || 0,
    });

    // Associate authors (if provided)
    if (authorIds) {
      const authorIdsArray = Array.isArray(authorIds) ? authorIds.map(Number) : [Number(authorIds)];
      const authors = await Author.findAll({ where: { id: authorIdsArray } });
      await article.addAuthors(authors); // Add authors to the article
    }

    // Respond with the created article
    res.status(201).json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: Author // Include associated authors
    });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get the most recently uploaded article
router.get('/latest', async (req, res) => {
  try {
    const latestArticle = await Article.findOne({
      order: [['uploadedAt', 'DESC']], // Sort by uploadedAt in descending order
      include: Author // Include associated authors
    });

    if (!latestArticle) {
      return res.status(404).json({ message: 'No articles found' });
    }

    res.json(latestArticle);
  } catch (err) {
    console.error('Error fetching latest article:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: Author // Include associated authors
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an article (requires authentication)
router.put('/:id', authenticateToken, authorizeRoles('admin', 'editor'), uploadMultiple, async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Update article details
    const { title, description, filetype, viewcount, downloadcount, authorIds } = req.body;
    const pdfPath = req.files && req.files['pdf'] ? req.files['pdf'][0].path : article.pdfPath;
    const coverImagePath = req.files && req.files['coverImage'] ? req.files['coverImage'][0].path : article.coverImage;

    await article.update({
      title: title || article.title,
      description: description || article.description,
      pdfPath,
      coverImage: coverImagePath,
      filetype: filetype || article.filetype,
      viewcount: viewcount !== undefined ? parseInt(viewcount) : article.viewcount,
      downloadcount: downloadcount !== undefined ? parseInt(downloadcount) : article.downloadcount,
    });

    // Re-associate authors if provided
    if (authorIds) {
      const authorIdsArray = Array.isArray(authorIds) ? authorIds.map(Number) : [Number(authorIds)];
      const authors = await Author.findAll({ where: { id: authorIdsArray } });
      await article.setAuthors(authors); // Update authors for the article
    }

    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/increment-viewcount', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the article by ID and increment the viewcount
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Increment viewcount and save
    article.viewcount = (article.viewcount || 0) + 1;
    await article.save();

    res.status(200).json({ message: 'View count incremented', viewcount: article.viewcount });
  } catch (error) {
    console.error('Error incrementing viewcount:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an article (requires authentication)
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'editor'), async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

     // Assuming your article model has a file path stored in a field like 'imagePath' or 'filePath'
     if (article.filePath) {
      const filePath = path.join(__dirname, '../uploads', article.filePath);
      console.log(filePath);

      // Check if file exists before deleting
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete the file
      }
    }

    await article.destroy();
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
