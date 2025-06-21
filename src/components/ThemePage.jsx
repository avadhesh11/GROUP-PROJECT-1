import React, { useState, useEffect } from 'react';
import axios from "axios";
import './ThemePage.css';
import Navbar from './Navbar';
import block_image from '../assets/couple.png';

function ThemePage() {
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/themes")
      .then((response) => {
        setThemes(response.data);
      })
      .catch((error) => {
        console.log("Error fetching the themes", error);
      });
  }, []);

  const Block = ({ image, title, location }) => (
    <div className="block">
      <div className="block-image" style={{ backgroundImage: `url(${image})` }}>
        <i className="fas fa-heart heart-icon"></i>
      </div>
      <div className="block-info">
        <h3>{title}</h3>
        <p>
          <i className="fas fa-map-marker-alt"></i> {location}
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="main_img" style={{ backgroundImage: `url(${block_image})` }}>
        <span>THEME</span>
      </div>

      <div className="block_content">
        {themes.length > 0 ? (
          themes.map((theme) => (
            <Block key={theme._id} {...theme} />
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>No themes available.</p>
        )}
      </div>
    </div>
  );
}

export default ThemePage;
