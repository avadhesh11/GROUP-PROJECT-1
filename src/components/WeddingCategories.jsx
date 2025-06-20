import React, { useState, useEffect } from 'react';
import './WeddingCategories.css';
import Navbar from './Navbar';
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
    <div className="card">
      <div className="card_text">{title}</div>
      <div className="card_image">
        <img src={image} alt={title} />
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="categories">
        <h2>Wedding Categories</h2>
        <div className="categories_sections">
          {categories.map((category) => (
            <Categories_card key={category._id} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeddingCategories;
