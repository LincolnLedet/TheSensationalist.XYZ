const express = require('express');
const { Cart, CartItem, Merch, User } = require('../database');
const { authenticateToken } = require('../middleware/auth'); // Assuming you have this middleware

const router = express.Router();

// POST route to add an item to a user's cart
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // This comes from the `authenticateToken` middleware
    const { merchId, quantity } = req.body;

    if (!merchId || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid item or quantity.' });
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    // Check if the item is already in the cart
    let cartItem = await CartItem.findOne({ where: { cartId: cart.id, merchId } });
    if (cartItem) {
      // Update the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Add a new item to the cart
      const merch = await Merch.findByPk(merchId);
      if (!merch) {
        return res.status(404).json({ message: 'Merch item not found.' });
      }

      cartItem = await CartItem.create({
        cartId: cart.id,
        merchId: merch.id,
        quantity,
        priceAtAdd: merch.price,
      });
    }

    res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
      const userId = req.user.id;
      const cart = await Cart.findOne({ where: { userId }, include: [{ model: CartItem, include: [Merch] }] });

      if (!cart || cart.CartItems.length === 0) {
          return res.status(200).json([]);
      }

      res.status(200).json(cart.CartItems);
  } catch (error) {
      console.error('Error fetching cart data:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route to remove an item from a user's cart
router.delete('/remove/:cartItemId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItemId = parseInt(req.params.cartItemId, 10);

    // Find the user's cart
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    // Find the item in the cart by cartItemId
    const cartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        id: cartItemId,
      },
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart.' });
    }

    // Remove the item from the cart
    await cartItem.destroy();

    res.status(200).json({ message: 'Item removed from cart.' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;



