import React from "react";
import "./Recordings.css";
import ArtistCard from "./ArtistCard";

const Recordings: React.FC = () => {
  return (
    <div className="recordingSection">
      <p>FINAL TAKE FRIDAYS</p>
      <div className="video-overlay">
        <video className="video-background" autoPlay loop muted playsInline>
          <source src="/videos/backGroundVid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="RecordTheRanchArtists">
        <ArtistCard
          name="John Doe"
          genre="Indie Rock"
          image="https://themoonlife.com/cdn/shop/files/ttb_diptych_NATEMOONLIFE_web_night2foil_1024x1024.png?v=1722783512"
        />

        <ArtistCard
          name="John Doe"
          genre="Indie Rock"
          image="https://themoonlife.com/cdn/shop/files/ttb_diptych_NATEMOONLIFE_web_night2foil_1024x1024.png?v=1722783512"
        />
        <ArtistCard
          name="Jane Smith"
          genre="Electronic"
          image="https://tse4.mm.bing.net/th?id=OIP.4lzS1XzVIGifBgGCL4UWlAHaLG&w=200&h=300&c=7"
        />
        <ArtistCard
          name="Jane Smith"
          genre="Electronic"
          image="https://tse2.mm.bing.net/th?id=OIP.ptHjEE1gv2lmV6qKk2npeQHaLH&w=200&h=300&c=7"
        />
        <ArtistCard
          name="Jane Smith"
          genre="Electronic"
          image="https://tse2.mm.bing.net/th?id=OIP.IBTTXKw-43DKL3Lop8AuRAHaKl&w=200&h=286&c=7"
        />
      </div>
    </div>
  );
};

export default Recordings;