import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Star, MapPin, Palette, Heart, Filter, ChevronDown, Eye, Sparkles } from 'lucide-react';
import block_image from '../assets/couple.png';


function ThemePage() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/themes")
      .then((response) => {
        setThemes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching the themes", error);
  
        setThemes(mockData);
        setLoading(false);
      });
  }, []);

  const ThemeCard = ({ image, title, location, rating, review, price, category, elements }) => (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <Palette size={14} className="mr-1" />
            {category || "Theme"}
          </span>
        </div>
        
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
          <Heart size={18} className="text-white group-hover:text-red-400 group-hover:fill-current transition-colors" />
        </button>

        {/* Preview Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:bg-white transition-colors">
            <Eye size={24} className="text-indigo-600" />
          </button>
        </div>

        {/* Rating Badge */}
        {rating && (
          <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-semibold text-gray-800">{rating}</span>
            <span className="text-xs text-gray-600">({review})</span>
          </div>
        )}

        {/* Sparkle Effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Sparkles size={32} className="text-white/40 animate-pulse" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-1 text-indigo-500" />
            <span className="text-sm truncate">{location}</span>
          </div>
        </div>

        {/* Price Section */}
        {price && (
          <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">₹{parseInt(price).toLocaleString()}</div>
              <div className="text-sm text-gray-600">complete setup</div>
              <div className="mt-2 text-xs text-indigo-600 font-medium">Customizable package</div>
            </div>
          </div>
        )}

        {/* Theme Elements */}
        {elements && (
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2">Includes:</div>
            <div className="flex flex-wrap gap-1">
              {elements.split(', ').map((element, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                  {element}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
            <Eye size={16} className="mr-2" />
            View Gallery
          </button>
          <button className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300">
            <Heart size={18} className="text-gray-600 hover:text-indigo-500" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section with Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={block_image} 
          alt="Themes" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/70 to-pink-900/80"></div>
        
        {/* Animated Sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 animate-pulse text-white/20">
            <Sparkles size={32} />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-bounce text-white/20" style={{ animationDelay: '1s' }}>
            <Palette size={28} />
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-pulse text-white/20" style={{ animationDelay: '2s' }}>
            <Sparkles size={24} />
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              THEMES
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Transform your celebration with stunning themed decorations
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              <span className="font-medium text-gray-900">{themes.length}</span> themes found
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
                  <option>Nationwide</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Theme Category</option>
                  <option>Luxury</option>
                  <option>Garden</option>
                  <option>Traditional</option>
                  <option>Modern</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Price Range</option>
                  <option>₹25,000-50,000</option>
                  <option>₹50,000-1,00,000</option>
                  <option>₹1,00,000+</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Event Type</option>
                  <option>Wedding</option>
                  <option>Engagement</option>
                  <option>Birthday</option>
                  <option>Corporate</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Themes Grid */}
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
                  <div className="flex space-x-3">
                    <div className="flex-1 h-12 bg-gray-200 rounded"></div>
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : themes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme) => (
              <ThemeCard key={theme._id} {...theme} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Palette size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No themes available</h3>
            <p className="text-gray-500">Check back later for amazing theme options!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThemePage;