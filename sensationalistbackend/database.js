// database.js
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const bcrypt = require('bcrypt');

// Initialize SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'data', 'database.sqlite'), // Store the database file in a 'data' folder
});

/// Existing Models (Article and Author)

// Define the Article model
const Article = sequelize.define('Article', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pdfPath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  uploadedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  filetype: {
    type: DataTypes.ENUM('Volume', 'Video', 'Image', 'Podcast', 'Issue', 'Music', 'Misc'),
    allowNull: false,
  },
  viewcount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  downloadcount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define the Author model
const Author = sequelize.define('Author', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true, // Stores the file path of the image
  },
});

// Define the many-to-many relationship through the join table 'ArticleAuthor'
Article.belongsToMany(Author, { through: 'ArticleAuthor' });
Author.belongsToMany(Article, { through: 'ArticleAuthor' });

/// New Models (User, Merch, Cart, CartItem)

// Define the User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Username must be unique
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Email must be unique
    validate: {
      isEmail: true, // Validates email format
    },
  }, // Closing brace correctly placed here
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false, // Store the hashed password
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subscription: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'customer', // Other roles might be 'admin', 'editor'
  },
});

// Password hashing before saving the user
User.beforeCreate(async (user, options) => {
  const saltRounds = 10;
  user.passwordHash = await bcrypt.hash(user.passwordHash, saltRounds);
});

// Add a method to validate password
User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

// Define the Merch model
const Merch = sequelize.define('Merch', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // For currency
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // Path to image file
    allowNull: true,
  },
});

// Define the Cart model
const Cart = sequelize.define('Cart', {
  // No additional fields needed for now
});

// Define the CartItem model
const CartItem = sequelize.define('CartItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

// Define Associations

// User and Cart
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Cart and CartItem
Cart.hasMany(CartItem, { foreignKey: 'cartId', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

// Merch and CartItem
Merch.hasMany(CartItem, { foreignKey: 'merchId' });
CartItem.belongsTo(Merch, { foreignKey: 'merchId' });

// Sync the models (create tables in the database)
// Be cautious with force: true as it will drop existing tables and data
// You may remove or comment out sequelize.sync() here if you synchronize the database elsewhere
// sequelize.sync({ /* force: true */ });

// Export sequelize and models
module.exports = { sequelize, Article, Author, User, Merch, Cart, CartItem };
//
//curl -X POST http://localhost:5000/api/articles \
//  -F "title=The Sensationalist Issue 1" \
//  -F "filetype=Issue" \
//  -F "coverImage=@/Users/linco/Desktop/Past Issues/The-Sensationalist-Cover-1.png" \
//  -F "pdf=@/Users/linco/Desktop/Past Issues/The_Sensationalist_1.pdf" \
//  -F $'description=This Issue Includes:\nSymmetry (A short film script)\nThe Fabric Cube\nOne Day I Will Replace All the Caffeine in Your Coffee.\nNew Stanford Study Raises Alarm Over Widespread Addiction\nThe O.A.R. Project,\nMusic of the #1: Clubbing Harder @ Home'
