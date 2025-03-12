import React from 'react';
import './Recordings.css';


const Recordings: React.FC = () => {
    return (
        <div className="recordingSection">
            <video className="video-background" autoPlay loop muted playsInline>
                <source src="/videos/xurDance.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default Recordings;