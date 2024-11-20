import React, { useState } from "react";
import './ShopPage.css';
import ShopListing from '../components/ShopListing';
import AnimatedHeader from "../components/AnimatedHeader";
import Footer from "../components/Footer";

const ShopPage: React.FC = () => {
    return (
        <div className="mainContentContainer">
            <AnimatedHeader />
            <div className="gallery">
                <ShopListing />
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}

export default ShopPage;