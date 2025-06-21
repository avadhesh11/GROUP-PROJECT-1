import React, { useState, useEffect } from 'react';
import axios from "axios";
import './ThemePage.css';
import Navbar from './Navbar';
import block_image from '../assets/couple.png';

function ThemePage() {
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
        <Block image={block_image} title="Title-1" location="Location-1" />
        <Block image={block_image} title="Title-2" location="Location-1" />
        <Block image={block_image} title="Title-3" location="Location-1" />
      </div>
    </div>
  );
}

export default ThemePage;
