import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Star, MapPin, Users, Bed, Heart, Filter, ChevronDown, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function FoodPage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/foods")
      .then((response) => {
        setFoods(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching foods", error);
        setLoading(false);
      });
  }, []);

  const redirect = (id) => {
    navigate(`/FoodInnerPage/:${id}`);
    window.scroll(0, 0);
  }

  const FoodCard = ({ id, image, title, rating, review, location, type, price, cuisine, servingStyle, minOrder }) => (
    <div onClick={() => redirect(id)} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-pink-200 hover:-translate-y-2 cursor-pointer">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
            {type}
          </span>
        </div>
        
        <button 
          onClick={(e) => e.stopPropagation()} 
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
        >
          <Heart size={18} className="text-white group-hover:text-pink-400 group-hover:fill-current transition-colors" />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="text-sm font-semibold text-gray-800">{rating}</span>
          <span className="text-xs text-gray-600">({review})</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-1 text-pink-500" />
            <span className="text-sm truncate">{location}</span>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Utensils size={16} className="text-orange-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Starting Price</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">₹{price}</div>
            <div className="text-xs text-gray-500">per plate</div>
          </div>
        </div>

        {/* Service Details */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-1 bg-green-50 px-3 py-1 rounded-full">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-sm text-green-700 font-medium">{cuisine || 'Multi-Cuisine'}</span>
          </div>
          
          <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full">
            <Users size={14} className="text-blue-500" />
            <span className="text-sm text-blue-700 font-medium">Min {minOrder || 50}</span>
          </div>
          
          <div className="bg-purple-50 px-3 py-1 rounded-full">
            <span className="text-sm text-purple-700 font-medium">{servingStyle || 'Buffet'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button 
            onClick={(e) => e.stopPropagation()} 
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View Menu
          </button>
          <button 
            onClick={(e) => e.stopPropagation()} 
            className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-all duration-300"
          >
            <Heart size={18} className="text-gray-600 hover:text-pink-500" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Wedding Catering
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Delicious cuisines for your special celebration
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              <span className="font-medium text-gray-900">{foods.length}</span> caterers found
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} />
              <span>Filters</span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Location</option>
                  <option>Delhi</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                  <option>Chennai</option>
                  <option>Kolkata</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Cuisine Type</option>
                  <option>North Indian</option>
                  <option>South Indian</option>
                  <option>Chinese</option>
                  <option>Continental</option>
                  <option>Multi-Cuisine</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Price Range</option>
                  <option>₹300-500</option>
                  <option>₹500-1000</option>
                  <option>₹1000-1500</option>
                  <option>₹1500+</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Service Type</option>
                  <option>Buffet</option>
                  <option>Plated Service</option>
                  <option>Live Counter</option>
                  <option>Family Style</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Foods Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between mb-4">
                    <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
                    <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
                    <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex space-x-3">
                    <div className="flex-1 h-12 bg-gray-200 rounded"></div>
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map((food) => (
              <FoodCard key={food._id} id={food._id} {...food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodPage;