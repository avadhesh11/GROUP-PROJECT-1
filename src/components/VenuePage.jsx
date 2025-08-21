import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Star, MapPin, Users, Bed, Heart, Filter, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_API_URL;
function VenuePage() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/venues`)
      .then((response) => {
        setVenues(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching venues", error);
        setLoading(false);
      });
  }, []);

  const redirect = (id) => {
    navigate(`/VenueInnerPage/:${id}`);
    window.scroll(0, 0);
  }

  const VenueCard = ({ id, image, title, rating, review, location, type, vegprice, nonvegprice, capacity, room, more }) => (
    <div onClick={() => redirect(id)} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-gray-700/50 dark:hover:shadow-gray-600/50 transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-400 hover:-translate-y-2 cursor-pointer">

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
          <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-semibold">
            {type}
          </span>
        </div>
        
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300 group">
          <Heart size={18} className="text-white group-hover:text-pink-400 group-hover:fill-current transition-colors" />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{rating}</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">({review})</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <MapPin size={16} className="mr-1 text-pink-500 dark:text-pink-400 flex-shrink-0" />
            <span className="text-sm truncate">{location}</span>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-orange-50 dark:from-green-900/30 dark:to-orange-900/30 rounded-xl border dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Vegetarian</span>
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">₹{vegprice}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">per plate</div>
            </div>
            
            <div className="w-px h-12 bg-gray-200 dark:bg-gray-600"></div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Non-Veg</span>
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">₹{nonvegprice}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">per plate</div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-1 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full border dark:border-blue-800">
            <Users size={14} className="text-blue-500 dark:text-blue-400" />
            <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">{capacity} guests</span>
          </div>
          
          <div className="flex items-center space-x-1 bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-full border dark:border-purple-800">
            <Bed size={14} className="text-purple-500 dark:text-purple-400" />
            <span className="text-sm text-purple-700 dark:text-purple-300 font-medium">{room} rooms</span>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-full border dark:border-gray-600">
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">+{more} more</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 dark:hover:from-pink-700 dark:hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-gray-900/50">
            View Details
          </button>
          <button className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-pink-300 dark:hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300">
            <Heart size={18} className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400" />
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
              Wedding Venues
            </h1>
            <p className="text-xl text-pink-100 dark:text-pink-200 max-w-2xl mx-auto">
              Discover the perfect venue for your special day
            </p>
          </div>
        </div>
      </div>

     <div className="bg-white border-b border-gray-200 sticky top-16 z-40 dark:bg-gray-900 dark:border-gray-700">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div className="flex items-center justify-between">
      <div className="text-gray-600 dark:text-gray-300">
        <span className="font-medium text-gray-900 dark:text-white">{venues.length}</span> venues found
      </div>
      
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors 
                   dark:border-gray-600 dark:hover:bg-gray-800 dark:text-gray-200"
      >
        <Filter size={16} />
        <span>Filters</span>
        <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
      </button>
    </div>

    {showFilters && (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select className="p-2 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-200">
            <option>Location</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
          </select>
          <select className="p-2 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-200">
            <option>Capacity</option>
            <option>50-100</option>
            <option>100-300</option>
            <option>300+</option>
          </select>
          <select className="p-2 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-200">
            <option>Price Range</option>
            <option>₹500-1000</option>
            <option>₹1000-2000</option>
            <option>₹2000+</option>
          </select>
          <select className="p-2 border border-gray-300 rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-200">
            <option>Venue Type</option>
            <option>Banquet Hall</option>
            <option>Resort</option>
            <option>Garden</option>
          </select>
        </div>
      </div>
    )}
  </div>
</div>


      {/* Venues Grid */}
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <VenueCard key={venue._id} id={venue._id} {...venue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default VenuePage;