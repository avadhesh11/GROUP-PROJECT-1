import React, { useState, useEffect } from 'react';
import './WeddingCategories.css';
import Navbar from './Navbar';
import venue_image from '../assets/couple.png';
import photography_image from '../assets/couple.png';
import theme_image from '../assets/couple.png';
import music_image from '../assets/couple.png';
import food_image from '../assets/couple.png';
import honeymoon_image from '../assets/couple.png';
import invitation_image from '../assets/couple.png';
import cards_image from '../assets/couple.png';
import axios from "axios";

function WeddingCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then((response) => {
        console.log("Fetched categories:", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log("Error fetching categories", error);
      });
  }, []);

  const Categories_card = ({ image, title }) => (
    <div className="background" style={{ backgroundImage: `url(${image})` }}>
      <div className="card_title">{title}</div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="categories">
        <h2>Wedding Categories</h2>
        <div className="categories_sections">
          {/* <div className="left_section">
            <Categories_card image={venue_image} title="VENUE" />
            <Categories_card image={photography_image} title="PHOTOGRAPHY" />
            <Categories_card image={music_image} title="MUSIC & DANCE" />
            <Categories_card image={honeymoon_image} title="HONEYMOON" />
          </div>
          <div className="right_section">
            <Categories_card image={food_image} title="FOOD" />
            <Categories_card image={theme_image} title="THEME" />
            <Categories_card image={invitation_image} title="INVITATIONS" />
            <Categories_card image={cards_image} title="CHATS" />
          </div> */}
          {categories.map((category)=>(
            <Categories_card key={category._id} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeddingCategories;
