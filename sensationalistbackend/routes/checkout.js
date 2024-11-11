// routes/checkout.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Ensure your .env file has STRIPE_SECRET_KEY set
const router = express.Router();

// Endpoint to create a Stripe Checkout session
router.post('/', async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'No items in the cart.' });
    }

    // Map cart items to line items for Stripe
    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.Merch.title,
          description: item.Merch.description,
          images: [item.Merch.image ? `http://localhost:5000/${item.Merch.image}` : ''], // Adjust the URL as needed
        },
        unit_amount: Math.round(item.priceAtAdd * 100), // Stripe expects amounts in cents
      },
      quantity: item.quantity,
    }));

    // Create the Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Replace with your frontend success URL
      cancel_url: 'http://localhost:3000/cancel', // Replace with your frontend cancel URL
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: 'Internal server error while creating checkout session.' });
  }
});

module.exports = router;
