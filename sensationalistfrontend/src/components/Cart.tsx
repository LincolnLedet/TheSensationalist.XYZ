import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Cart.css'; // Ensure this file exists and is styled as needed
import { AuthContext } from '../AuthContext'; // Import your AuthContext
import { useNavigate } from 'react-router-dom';

interface CartItem {
    id: number;
    quantity: number;
    priceAtAdd: number;
    merch: {
        id: number;
        title: string;
        image: string;
    };
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { auth } = authContext;
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.token) {
            console.log('auth.token:', auth.token);
            alert('You need to be logged in to view your cart.');
            //navigate('/login');
            return;
        }

        axios.get('http://localhost:5000/api/cart', {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        })
        .then(response => {
            setCartItems(response.data);
            const total = response.data.reduce((sum: number, item: CartItem) => sum + (item.quantity * item.priceAtAdd), 0);
            setTotalPrice(total);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching cart data:', error);
            setLoading(false);
        });
    }, [auth.token, navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (cartItems.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    return (
        <div className="cart-page-container">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={`http://localhost:5000/${item.merch.image}`} alt={item.merch.title} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3>{item.merch.title}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price per item: ${item.priceAtAdd.toFixed(2)}</p>
                            <p>Total: ${(item.quantity * item.priceAtAdd).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                <button className="checkout-button" onClick={() => alert('Proceed to checkout flow')}>Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
