import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BandPage.css'
import AnimatedHeader from '../components/AnimatedHeader';

const BandPage: React.FC = () => {
    const { bandName } = useParams();
    const [band, setBand] = useState<any>(null);

    useEffect(() => {
        axios.get('https://www.the-sensationalist.xyz/api/bands')
            .then(res => {
                const matchedBand = res.data.find((b: any) =>
                    b.title.toLowerCase().replace(/\s+/g, '-') === bandName?.toLowerCase()
                );
                setBand(matchedBand);
            });
    }, [bandName]);

    if (!band) return <p>Band not found or loading...</p>;

    return (
        <div className='bandPageContainer'>
            <AnimatedHeader/>
            <div className='bandPageGrid'>

            <h1>{band.title}</h1>
            <p>{band.genre}</p>
            <img src={`https://www.the-sensationalist.xyz/api/uploads/images/${band.landingImage}`} alt={band.title} />
            </div>

        </div>
    );
};

export default BandPage;
