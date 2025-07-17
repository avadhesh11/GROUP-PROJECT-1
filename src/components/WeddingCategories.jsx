import React, { useState, useEffect } from 'react';
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
    <div className="flex justify-between items-center h-24 rounded-lg bg-gray-100 p-6 shadow-md w-full transition-transform hover:scale-[1.02]">
      <div className="text-xl md:text-2xl font-bold text-gray-800">{title}</div>
      <div className="ml-4 flex-shrink-0">
        <img src={image} alt={title} className="w-36 h-24 rounded-lg object-cover" />
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="px-4 py-8 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl mb-6 font-semibold text-gray-800">Wedding Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Categories_card key={category._id} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeddingCategories;
