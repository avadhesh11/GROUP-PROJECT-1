import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import block_image from '../assets/couple.png'; // Unused but can be used for fallback

function VenuePage() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/venues")
      .then((response) => {
        setVenues(response.data);
      })
      .catch((error) => {
        console.error("Error fetching venues", error);
      });
  }, []);

  const Block = ({ image, title, rating, review, location, type, vegprice, nonvegprice, capacity, room, more }) => (
    <div className="w-full md:w-[30%] bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.025] hover:shadow-2xl hover:border-2 hover:border-[#F0F0E8] flex flex-col group">
      <div className="relative h-60 w-full">
        <img src={image} alt={title} className="h-60 w-full object-cover rounded-t-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-2xl"></div>
      </div>
      <div className="p-6 flex flex-col gap-4 text-gray-800 font-poppins">
        <div className="flex items-center justify-between">
          <div className="text-xl font-extrabold text-gray-900 truncate group-hover:text-[#F0F0E8] transition-colors">{title}</div>
          <div className="flex items-center ml-2">
            <i className="fas fa-star text-yellow-400 text-lg"></i>
            <span className="text-sm text-gray-500 ml-1 font-medium">{rating} <span className="hidden sm:inline">({review} reviews)</span></span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 justify-between">
          <div className="flex items-center max-w-[150px] truncate">
            <i className="fas fa-map-marker-alt text-[#F0F0E8] mr-1"></i>
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center max-w-[150px] truncate">
            <i className="fas fa-landmark text-[#F0F0E8] mr-1"></i>
            <span className="truncate">{type}</span>
          </div>
        </div>
        <div className="flex justify-evenly gap-6 text-base font-semibold">
          <div className="flex flex-col items-center">
            <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold mb-1">Veg</span>
            <span className="font-bold text-gray-900 text-lg">₹{vegprice}</span>
            <span className="text-xs text-gray-500">per plate</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="inline-block px-2 py-1 rounded-full bg-[#F0F0E8] text-gray-700 text-xs font-bold mb-1">Non Veg</span>
            <span className="font-bold text-gray-900 text-lg">₹{nonvegprice}</span>
            <span className="text-xs text-gray-500">per plate</span>
          </div>
        </div>
        <div className="flex justify-evenly items-center text-xs text-gray-600 gap-2 mt-2">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
            <i className="fas fa-users mr-1 text-gray-400"></i>
            {capacity} <span className="ml-1 text-gray-500">persons</span>
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
            <i className="fas fa-bed mr-1 text-gray-400"></i>
            {room} <span className="ml-1 text-gray-500">Rooms</span>
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
            <i className="fas fa-ellipsis-h mr-1 text-gray-400"></i>
            +{more} <span className="ml-1 text-gray-500">more</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap gap-8 p-8 justify-center bg-[#ebebeb] min-h-screen">
        {venues.map((venue) => (
          <Block key={venue._id} {...venue} />
        ))}
      </div>
    </div>
  );
}

export default VenuePage;
