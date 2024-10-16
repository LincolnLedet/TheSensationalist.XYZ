// database.js
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'data', 'database.sqlite'), // Store the database file in a 'data' folder
});
/* 
curl -X POST http://localhost:5000/api/articles \
  -F 'title=The Sensationalist Issue #5' \
  -F 'description=' \
  -F "pdf=@\"C:/Users/linco/Desktop/Past Issues/The_Sensationalist_5.pdf\"" \
  -F 'filetype=Article' \
  -F 'viewcount=0' \
  -F 'downloadcount=0' \
  -F 'profane=False'
 */
// Define the Article model
const Article = sequelize.define('Article', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  pdfPath: { type: DataTypes.STRING, allowNull: true },
  uploadedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  filetype: {
    type: DataTypes.ENUM,
    values: ['Article', 'Volume', 'Video', 'Image', 'Podcast', "Issue"], // Add more types as needed
  },
  viewcount: {type : DataTypes.NUMBER, allowNull: true },
  downloadcount: {type : DataTypes.NUMBER, allowNull: true }
});

// Sync the models
sequelize.sync();

module.exports = { sequelize, Article };