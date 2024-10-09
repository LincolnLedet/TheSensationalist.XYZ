// database.js
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'data', 'database.sqlite'), // Store the database file in a 'data' folder
});

// Define the Article model
const Article = sequelize.define('Article', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  pdfPath: { type: DataTypes.STRING, allowNull: true },
  uploadedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Sync the models
sequelize.sync();

module.exports = { sequelize, Article };