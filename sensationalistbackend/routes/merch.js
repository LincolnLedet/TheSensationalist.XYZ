// routes/merch.js
const express = require('express');
const multer = require('multer');
const { Merch } = require('../database'); // Import the Merch model
const { authenticateToken, authorizeRoles } = require('../middleware/auth'); // Import middleware for authentication

const router = express.Router();

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Name the file uniquely
  }
});

const upload = multer({ storage: storage });

// POST route for adding new merch items (admin only)
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin'), // Require admin role for this route
  upload.single('image'),
  async (req, res) => {
    try {
      const { title, description, price } = req.body;
      const imagePath = req.file ? req.file.path : null;

      // Validate request data
      if (!title || !price) {
        return res.status(400).json({ message: 'Title and price are required.' });
      }

      // Create a new merch item in the database
      const newMerch = await Merch.create({
        title,
        description,
        price,
        image: imagePath
      });

      res.status(201).json(newMerch);
    } catch (error) {
      console.error('Error uploading merch item:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  }
);

// GET routes (no changes needed)
router.get('/', async (req, res) => {
  try {
    const merchItems = await Merch.findAll();
    res.status(200).json(merchItems);
  } catch (error) {
    console.error('Error fetching merch items:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const merchItem = await Merch.findByPk(req.params.id);
    if (!merchItem) {
      return res.status(404).json({ message: 'Merch item not found.' });
    }
    res.status(200).json(merchItem);
  } catch (error) {
    console.error('Error fetching merch item:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
