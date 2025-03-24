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
    validate: {
      isPdfFormat(value) {
        if (value && !value.toLowerCase().endsWith('.pdf')) {
          throw new Error('Only PDF files are allowed');
        }
      }
    }
  },
  uploadedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  filetype: {
    type: DataTypes.ENUM('Volume', 'Article', 'misc'),
    allowNull: false,
  },
  contentType: {
    type: DataTypes.ENUM('Poem', 'Story', 'Interview', 'Tutorial', 'Review', 'Comedy', 'Travel', 'Lifestyle', 
      'Science', 'Tech', 'Music', 'Skateboarding', 'Activity', 'Opinion', 'News', 'Biography', 'Satire', 'Analysis', 
      'Memoir', 'Horror', 'Fantasy', 'Sci-Fi', 'Drama', 'Mystery', 'History', 'Education', 'Gaming', 'Photography', 
      'Film', 'Food', 'Health', 'Fitness', 'DIY', 'Finance', 'Business', 'Motivation', 'Philosophy', 'Psychology', 
      'Spirituality', 'Environment', 'Politics', 'Fashion' , 'Weird'),
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


const Band = sequelize.define('Band', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  spotifyLink: { type: DataTypes.STRING, allowNull: true },
  appleMusicLink: { type: DataTypes.STRING, allowNull: true },
  landingImage: { type: DataTypes.STRING, allowNull: true },
  websiteLink: { type: DataTypes.STRING, allowNull: true },
  instagramLink: { type: DataTypes.STRING, allowNull: true },
  videoLink: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true }
});


const AudioTrack = sequelize.define('AudioTrack', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
      isMp3Format(value) {
        if (!value.toLowerCase().endsWith('.mp3')) {
          throw new Error('Only .mp3 files are allowed');
        }
      }
    }
  },
  albumArt: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isJpegFormat(value) {
        if (value && !value.toLowerCase().endsWith('.jpeg') && !value.toLowerCase().endsWith('.jpg')) {
          throw new Error('Only JPEG files are allowed');
        }
      }
    }
  }

});

const BandPhoto = sequelize.define('BandPhoto', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath : {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isJpegFormat(value) {
        if (value && !value.toLowerCase().endsWith('.jpeg') && !value.toLowerCase().endsWith('.jpg')) {
          throw new Error('Only JPEG files are allowed');
        }
      }
    }
  }
});

Band.hasMany(AudioTrack, { foreignKey: 'bandId', onDelete: 'CASCADE' });
AudioTrack.belongsTo(Band, { foreignKey: 'bandId' });

Band.hasMany(BandPhoto, { foreignKey: 'bandId', onDelete: 'CASCADE' });
BandPhoto.belongsTo(Band, { foreignKey: 'bandId' });


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
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true, // Validates email format
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define the many-to-many relationship through the join table 'ArticleAuthor'
Article.belongsToMany(Author, { through: 'ArticleAuthor' });
Author.belongsToMany(Article, { through: 'ArticleAuthor' });

/// New Models (User, Merch, Cart, CartItem, Order, OrderItem)

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
  },
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
  priceAtAdd: {
    type: DataTypes.DECIMAL(10, 2), // Price of the item when it was added to the cart
    allowNull: false,
  },
});

// Define the Order model
const Order = sequelize.define('Order', {
  status: {
    type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
    defaultValue: 'Pending',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paymentInfo : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  shippingAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trackingNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define the OrderItem model
const OrderItem = sequelize.define('OrderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  priceAtPurchase: {
    type: DataTypes.DECIMAL(10, 2), // Price at the time of order
    allowNull: false,
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

// User and Order
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Order and OrderItem
Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Merch and OrderItem
Merch.hasMany(OrderItem, { foreignKey: 'merchId' });
OrderItem.belongsTo(Merch, { foreignKey: 'merchId' });

// Sync the models (create tables in the database)
// Be cautious with force: true as it will drop existing tables and data
// You may remove or comment out sequelize.sync() here if you synchronize the database elsewhere
// sequelize.sync({ /* force: true */ });


//Formates File Names
const sanitizeFileName = (filename) => {
  return filename
    .toLowerCase()  // Convert to lowercase
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/[^a-z0-9_.\-\/\\]/g, ''); // Allow _ . - / \
};

// Sanitize `pdfPath` in `Article`
Article.beforeSave(async (article) => {
  if (article.pdfPath) {
    article.pdfPath = sanitizeFileName(article.pdfPath);
  }
});

AudioTrack.beforeSave(async (audioTrack) => {
  if (audioTrack.filePath) {
    audioTrack.filePath = sanitizeFileName(audioTrack.filePath);
  }
  if (audioTrack.albumArt) {
    audioTrack.albumArt = sanitizeFileName(audioTrack.albumArt);
  }
});

Band.beforeSave(async (band) => {
  if (band.landingImage) {
    band.landingImage = sanitizeFileName(band.landingImage);
  }
});

// ✅ Fix: Ensure `BandPhoto` sanitizes `filePath`, not `albumArt`
BandPhoto.beforeSave(async (bandPhoto) => {
  if (bandPhoto.filePath) {
    bandPhoto.filePath = sanitizeFileName(bandPhoto.filePath);
  }
});


// Export sequelize and models
module.exports = { sequelize, Article, Author, User, Band, BandPhoto, AudioTrack, Merch, Cart, CartItem, Order, OrderItem };
