const express = require('express');
const Article = require('../models/Article'); // Adjust the path if necessary

const router = express.Router();

// Get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Export the router
module.exports = router;
