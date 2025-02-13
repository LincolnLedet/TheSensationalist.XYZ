const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { sequelize } = require('./database');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// ❌ Disable CORS restrictions completely
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// ❌ Temporarily disable Helmet (sometimes it messes with CORS)
app.use(helmet({ contentSecurityPolicy: false }));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Serve static files from 'uploads' directory
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Import and use routes
const articleRoutes = require('./routes/articles');
const authRoutes = require('./routes/auth');
const merchRoutes = require('./routes/merch');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');

app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/merch', merchRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

// ✅ Start the server
sequelize.sync().then(() => {
  const PORT = 5000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
