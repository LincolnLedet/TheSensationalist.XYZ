import React, { useContext, useEffect, useState } from 'react';
import './Footer.css';
import { ReactComponent as SensationalistLogo } from './SVGs/SensationalistLogo.svg';



const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'https://the-sensationalist.xyz' // Backend URL in development
    : ''; // In production, requests default to the same origin
    
const Footer: React.FC = () => {
    return (
        <footer className="footer"> 
            <div className="footer-left">
            <i className='bx bx-copyright'> 2024 The Sensationalist. All Rights Reserved.</i>

            </div>
            <div className="footer-center">
                    <SensationalistLogo className="footer-logo"/>
            </div>
            <div className="footer-right">
                Contact Us:
                <i className='bx bx-envelope'></i>
                <i className='bx bxl-instagram'></i>
            </div>
            
             
        </footer>

    );
}

export default Footer;