import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import { TiShoppingCart } from 'react-icons/ti';
import './ShopListing.css';

interface MerchItem {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string; // URL or path to the image
}


const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://the-sensationalist.xyz' // Backend URL in development
    : ''; // In production, requests default to the same origin

const ShopListing: React.FC = () => {
    const [merchItems, setMerchItems] = useState<MerchItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get(`${baseURL}/api/merch`)
            .then(response => {
                setMerchItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching merch data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="gallery"> {/* Ensure this container uses the .gallery class */}
            {merchItems.map((item) => (
                <Link to={`/item/${item.id}`} key={item.id} className="gallery-item-link"> {/* Wrap in Link */}
                    <div className="gallery-item">
                        <img src={`${baseURL}/${item.image}`} alt={item.title} />
                        <h3 className="product-name">{item.title}</h3>
                        {item.description && <p className="product-description">{item.description}</p>}
                        <div className="price-cart-container">
                            <p className="product-price">${item.price.toFixed(2)}</p>
                            <TiShoppingCart className="icon" size={36} />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default ShopListing;
