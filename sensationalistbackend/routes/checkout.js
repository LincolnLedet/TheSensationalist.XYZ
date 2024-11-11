const express = require('express');
const stripe = require('../config/stripe'); // Import Stripe instance
const router = express.Router();

router.post('/checkout', async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Convert cart items into line items for Stripe
    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.Merch.title,
        },
        unit_amount: Math.round(item.priceAtAdd * 100), // Amount in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: 'Failed to create checkout session.' });
  }
});

module.exports = router;
