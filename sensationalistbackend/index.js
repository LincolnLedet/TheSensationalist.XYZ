// index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { sequelize } = require('./database');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// 1. Apply CORS middleware first
app.use(cors({ origin: "*" }));

// 2. Temporarily disable Helmet for testing
// Comment out Helmet to rule out interference
// app.use(helmet());

// 3. Parse JSON bodies
app.use(express.json());

// 4. Serve static files from the 'uploads' directory
app.use('/api/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Frontend origin
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}, express.static(path.join(__dirname, 'uploads')));

// 5. Import and use route

const articleRoutes = require('./routes/articles');
const authRoutes = require('./routes/auth'); // Add auth routes
const merchRoutes = require('./routes/merch');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout'); // Import the checkout route




app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes); // Use the auth routes
app.use('/api/merch', merchRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes); // Use the route with a specific prefix (e.g., '/api')




// 6. Start the server
sequelize.sync().then(() => {
  const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
});
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

