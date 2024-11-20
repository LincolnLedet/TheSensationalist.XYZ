import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext'; // Ensure this path is correct
import './ItemDetails.css';
const backend_port = process.env.REACT_APP_BACKEND_PORT;

interface MerchItem {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

const ItemDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the ID from the route params
    const [item, setItem] = useState<MerchItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { auth } = authContext;

    useEffect(() => {
        axios.get(`http://localhost:${backend_port}/api/merch/${id}`)
            .then(response => {
                setItem(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching item details:', error);
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        if (item && auth.token) {
            axios.post(
                `http://localhost:${backend_port}/api/cart/add`,
                { merchId: item.id, quantity: 1 },
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                }
            )
            .then(() => {
                alert(`${item.title} has been added to your cart.`);
            })
            .catch(error => {
                console.error('Error adding item to cart:', error.response || error);
                alert('Failed to add item to cart.');
            });
        } else {
            alert('You need to be logged in to add items to the cart.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!item) {
        return <p>Item not found</p>;
    }

    return (
        <div className="item-details-container">
            <img src={`http://localhost:${backend_port}/${item.image}`} alt={item.title} className="item-image" />
            <h1 className="item-title">{item.title}</h1>
            <p className="item-description">{item.description}</p>
            <p className="item-price">${item.price.toFixed(2)}</p>
            <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
        </div>
    );
};

export default ItemDetails;
