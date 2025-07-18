import React, { useState, useEffect } from 'react';
import axios from "axios";
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
    <div className="w-full md:w-[30%] bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.03] flex flex-col">
      <div className="relative h-52 w-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
        <i className="fas fa-heart absolute top-3 right-3 text-lg text-black bg-white/80 p-2 rounded-full cursor-pointer"></i>
      </div>
      <div className="p-5 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="flex items-center justify-center gap-2 text-gray-600 text-base mt-1">
          <i className="fas fa-map-marker-alt text-[#F0F0E8]"></i> {location}
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="mt-4 h-[40vh] flex items-center justify-center bg-cover bg-center border border-black relative" style={{ backgroundImage: `url(${block_image})` }}>
        <span className="text-white font-bold text-4xl md:text-5xl drop-shadow-[2px_2px_5px_rgba(0,0,0,0.6)]">THEME</span>
      </div>
      <div className="flex flex-wrap justify-center gap-8 p-8">
        {themes.length > 0 ? (
          themes.map((theme) => (
            <Block key={theme._id} {...theme} />
          ))
        ) : (
          <p className="text-center mt-8 text-gray-500 text-lg">No themes available.</p>
        )}
      </div>
    </div>
  );
}

export default ThemePage;
