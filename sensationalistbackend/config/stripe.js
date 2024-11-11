require('dotenv').config(); // Load environment variables from .env file
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key

module.exports = stripe; // Export the initialized Stripe instance
