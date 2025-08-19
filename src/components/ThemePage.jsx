import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Star, MapPin, Palette, Heart, Filter, ChevronDown, Eye, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ThemePage() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/themes")
      .then((response) => {
        setThemes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching the themes", error);
        setLoading(false);
      });
  }, []);

  const redirect = (id) => {
    navigate(`/ThemeInnerPage/:${id}`);
    window.scroll(0, 0);
  }

  const ThemeCard = ({ id, image, title, location, rating, review, price, category, elements }) => (
    <div onClick={() => redirect(id)} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-gray-700/50 dark:hover:shadow-gray-600/50 transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-400 hover:-translate-y-2 cursor-pointer">

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
          <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <Palette size={14} className="mr-1" />
            {category || "Theme"}
          </span>
        </div>
        
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300 group">
          <Heart size={18} className="text-white group-hover:text-red-400 group-hover:fill-current transition-colors" />
        </button>

        {/* Preview Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors">
            <Eye size={24} className="text-indigo-600 dark:text-indigo-400" />
          </button>
        </div>

        {/* Rating Badge */}
        {rating && (
          <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{rating}</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">({review})</span>
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
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <MapPin size={16} className="mr-1 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
            <span className="text-sm truncate">{location}</span>
          </div>
        </div>

        {/* Price Section */}
        {price && (
          <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl border dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">₹{parseInt(price).toLocaleString()}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">complete setup</div>
              <div className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium">Customizable package</div>
            </div>
          </div>
        )}

        {/* Theme Elements */}
        {elements && (
          <div className="mb-4">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Includes:</div>
            <div className="flex flex-wrap gap-1">
              {elements.split(', ').map((element, index) => (
                <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs">
                  {element}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 dark:hover:from-indigo-700 dark:hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-gray-900/50 flex items-center justify-center">
            <Eye size={16} className="mr-2" />
            View Gallery
          </button>
          <button className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300">
            <Heart size={18} className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-700 dark:from-pink-700 dark:via-purple-800 dark:to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Themes
            </h1>
            <p className="text-xl text-pink-100 dark:text-pink-200 max-w-2xl mx-auto">
              Transform your celebration with stunning themed decorations
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-600 dark:text-gray-300">
              <span className="font-medium text-gray-900 dark:text-white">{themes.length}</span> themes found
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:text-gray-200"
            >
              <Filter size={16} />
              <span>Filters</span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-gray-200">
                  <option>Location</option>
                  <option>Delhi</option>
                  <option>Mumbai</option>
                  <option>Nationwide</option>
                </select>
                <select className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-gray-200">
                  <option>Theme Category</option>
                  <option>Luxury</option>
                  <option>Garden</option>
                  <option>Traditional</option>
                  <option>Modern</option>
                </select>
                <select className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-gray-200">
                  <option>Price Range</option>
                  <option>₹25,000-50,000</option>
                  <option>₹50,000-1,00,000</option>
                  <option>₹1,00,000+</option>
                </select>
                <select className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-gray-200">
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
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse border dark:border-gray-700">
                <div className="h-64 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="flex space-x-3">
                    <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : themes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme) => (
              <ThemeCard key={theme._id} id={theme._id} {...theme} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Palette size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No themes available</h3>
            <p className="text-gray-500 dark:text-gray-400">Check back later for amazing theme options!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThemePage;