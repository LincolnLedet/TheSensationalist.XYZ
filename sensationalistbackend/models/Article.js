// models/Article.js

const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    pdfPath: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Article', ArticleSchema);
