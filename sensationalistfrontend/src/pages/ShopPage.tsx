import React, { useState} from "react";
import './ShopPage.css';
import ShopListing from '../components/ShopListing';
import AnimatedHeader from "../components/AnimatedHeader";

const ShopPage: React.FC = () => {

    return (
        <div className="mainContentContainer">

            <AnimatedHeader />

            <div className="gallery">
                <ShopListing />
                <ShopListing />
                <ShopListing />
                <ShopListing />
                <ShopListing />
                <ShopListing />
                <ShopListing />
                <ShopListing />
               
            </div>
        </div>
    );
}

export default ShopPage;