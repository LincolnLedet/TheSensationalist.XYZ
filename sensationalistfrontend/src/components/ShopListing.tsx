import React, { useState} from "react";
import './ShopListing.css';
import { TiShoppingCart } from "react-icons/ti";



const ShopListing: React.FC = () => {

    return (
        
        <div className="gallery-item">
            <img src="https://shop.thrashermagazine.com/cdn/shop/files/SKATEMAG-LIGHTSTEEL-HOODIE-1.jpg?v=1687288314&width=900" alt="Hoodie"/>
            <h3 className="product-name">Thrasher Hoodie</h3>
            <p className="product-type">Hoodie</p>
            <div className="price-cart-container" >
                <p className="product-price">$69.95</p>
                <TiShoppingCart className="icon" size={36} />
            </div>
            
        </div>
        
    );
}

export default ShopListing;