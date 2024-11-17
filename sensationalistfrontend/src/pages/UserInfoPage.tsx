import React, { useState} from "react";
import './UserInfoPage.css';
import UserInfo from '../components/UserInfo';
import AnimatedHeader from "../components/AnimatedHeader";
import AdminUpload from "../components/AdminUpload";

const ShopPage: React.FC = () => {

    return (
        <div className="mainContentContainer">

            <AnimatedHeader />
            <UserInfo />
            <AdminUpload />
        </div>
    );
}

export default ShopPage;