import React, { useState} from "react";
import './UserInfoPage.css';
import UserInfo from '../components/UserInfo';
import AnimatedHeader from "../components/AnimatedHeader";
import AdminUpload from "../components/AdminUpload";
import AdminAuthorUpload from "../components/AdminAuthorUpload";
import AdminMerchUpload from "../components/AdminMerchUpload";
import Footer from "../components/Footer";
import RemoveUploads from "../components/RemoveUploads";

const ShopPage: React.FC = () => {

    return (
        <div className="mainContentContainer">

            <AnimatedHeader />
            <UserInfo />
            <AdminUpload />
            <AdminAuthorUpload />
            <AdminMerchUpload />
            <RemoveUploads />
            <Footer />

        </div>
        
    );
}

export default ShopPage;