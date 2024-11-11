import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import './Cart.css';
import { useStripe } from '@stripe/react-stripe-js';

interface CartItem {
  id: number;
  quantity: number;
  priceAtAdd: number;
  Merch: {
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
          const response = await fetch('http://localhost:5000/api/cart/', {
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

  const handleCheckout = async () => {
    if (!stripe) {
      console.error('Stripe has not loaded yet.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/checkout', {
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

  if (loading) {
    return <div>Loading your cart...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-grid">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-card">
            <img
              src={`http://localhost:5000/${item.Merch.image}`}
              alt={item.Merch.title}
              className="cart-image"
            />
            <div className="cart-info">
              <h3 className="cart-title">{item.Merch.title}</h3>
              <p className="cart-quantity">Quantity: {item.quantity}</p>
              <p className="cart-price">Price: ${(item.priceAtAdd / 100).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="checkout-button" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
