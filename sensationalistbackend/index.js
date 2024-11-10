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
app.use(cors({
  origin: 'http://localhost:3000', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If you need to send cookies or auth headers
}));

// 2. Temporarily disable Helmet for testing
// Comment out Helmet to rule out interference
// app.use(helmet());

// 3. Parse JSON bodies
app.use(express.json());

// 4. Serve static files from the 'uploads' directory
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Frontend origin
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}, express.static(path.join(__dirname, 'uploads')));

// 5. Import and use routes
const articleRoutes = require('./routes/articles');
const authRoutes = require('./routes/auth'); // Add auth routes

app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes); // Use the auth routes

// 6. Start the server
sequelize.sync().then(() => {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

