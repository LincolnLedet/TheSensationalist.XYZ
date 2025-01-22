import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import './Cart.css';
import { useStripe } from '@stripe/react-stripe-js';


const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000' // Backend URL in development
    : ''; // In production, requests default to the same origin

interface CartItem {
  id: number; // CartItem ID
  quantity: number;
  priceAtAdd: number;
  Merch: {
    id: number; // Merch ID
    title: string;
    description: string;
    price: number;
    image: string;
  };
}

const Cart: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const stripe = useStripe();

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { auth } = authContext;

  useEffect(() => {
    const fetchCartItems = async () => {
      if (auth.isLoggedIn && auth.token) {
        try {
          const response = await fetch(`${baseURL}/api/cart/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${auth.token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setCartItems(data);
          } else {
            const errorData = await response.json();
            setError(errorData.message || 'Failed to fetch cart items.');
          }
        } catch (error) {
          console.error('Error fetching cart data:', error);
          setError('An error occurred while fetching cart items.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError('You must be logged in to view your cart.');
      }
    };

    fetchCartItems();
  }, [auth]);

  const handleRemoveItem = async (cartItemId: number) => {
    if (auth.isLoggedIn && auth.token) {
      try {
        const response = await fetch(`${baseURL}/api/cart/remove/${cartItemId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`,
          },
        });
  
        if (response.ok) {
          setCartItems(cartItems.filter((item) => item.id !== cartItemId));
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to remove item from cart.');
        }
      } catch (error) {
        console.error('Error removing item from cart:', error);
        setError('An error occurred while removing the item.');
      }
    }
  };
  

  const handleCheckout = async () => {
    if (!stripe) {
      console.error('Stripe has not loaded yet.');
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`, // Include if needed
        },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error creating checkout session:', errorData);
        return;
      }

      const session = await response.json();

      if (session.id) {
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
        if (error) {
          console.error('Error redirecting to checkout:', error.message);
        }
      } else {
        console.error('Session ID not received.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.priceAtAdd, 0);

  if (loading) {
    return <div>Loading your cart...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  if (cartItems.length === 0) {
    return <div className="empty-cart-message">Your cart is empty.</div>;
  }
  

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-grid">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-card">
            <img
              src={`${baseURL}/${item.Merch.image}`}
              alt={item.Merch.title}
              className="cart-image"
            />
            <div className="cart-info">
              <h3 className="cart-title">{item.Merch.title}</h3>
              <p className="cart-quantity">Quantity: {item.quantity}</p>
              <p className="cart-price">Price: ${item.priceAtAdd.toFixed(2)}</p>
              <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
      <button className="checkout-button" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
