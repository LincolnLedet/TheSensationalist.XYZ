import React, { useState} from "react";
import './UserInfoPage.css';
import UserInfo from '../components/UserInfo';
import AnimatedHeader from "../components/AnimatedHeader";
import AdminUpload from "../components/AdminUpload";
import AdminAuthorUpload from "../components/AdminAuthorUpload";

const ShopPage: React.FC = () => {

    return (
        <div className="mainContentContainer">

            <AnimatedHeader />
            <UserInfo />
            <AdminUpload />
            <AdminAuthorUpload />
        </div>
    );
}

export default ShopPage;