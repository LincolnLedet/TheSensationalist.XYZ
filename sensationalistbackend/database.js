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
  -F 'title=The Sensationalist Issue #1' \
  -F 'description=Symmetry (A short film script), The Fabric Cube, One Day I Will Replace All the Caffeine in Your Coffee, New Stanford Study Raises Alarm Over Widespread Addiction, The O.A.R. Project, and Music of the #1: Clubbing Harder @ Home.' \
  -F "pdf=@\"C:/Users/linco/Desktop/Past Issues/The_Sensationalist_1.pdf\"" \
  -F "coverImage=@\"C:/Users/linco/Desktop/Past Issues/The-Sensationalist-Cover-1.png\"" \
  -F 'filetype=Issue' \
  -F 'viewcount=0' \
  -F 'downloadcount=0' \
  -F 'profane=False'
 */
// Define the Article model
// Article Model
const Article = sequelize.define('Article', {
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  description: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  pdfPath: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  uploadedAt: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },
  filetype: {
    type: DataTypes.ENUM,
    values: ['Volume', 'Video', 'Image', 'Podcast', 'Issue', 'Music', 'Misc'],
  },
  viewcount: {
    type: DataTypes.INTEGER,
    allowNull: true 
  },
  downloadcount: {
    type: DataTypes.INTEGER,
    allowNull: true 
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: true 
  }
});

// Author Model
const Author = sequelize.define('Author', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Define the many-to-many relationship through the join table ArticleAuthor
Article.belongsToMany(Author, { through: 'ArticleAuthor' });
Author.belongsToMany(Article, { through: 'ArticleAuthor' });


// Sync the models
sequelize.sync();

module.exports = { sequelize, Article };