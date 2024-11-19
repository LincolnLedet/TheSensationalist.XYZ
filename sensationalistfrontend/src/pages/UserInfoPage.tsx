import React, { useState} from "react";
import './UserInfoPage.css';
import UserInfo from '../components/UserInfo';
import AnimatedHeader from "../components/AnimatedHeader";
import AdminUpload from "../components/AdminUpload";
import AdminAuthorUpload from "../components/AdminAuthorUpload";
import AdminMerchUpload from "../components/AdminMerchUpload";

const ShopPage: React.FC = () => {

    return (
        <div className="mainContentContainer">

            <AnimatedHeader />
            <UserInfo />
            <AdminUpload />
            <AdminAuthorUpload />
            <AdminMerchUpload />
        </div>
    );
}

export default ShopPage;