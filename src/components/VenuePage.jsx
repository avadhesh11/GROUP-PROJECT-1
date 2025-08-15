import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Star, MapPin, Users, Bed, Heart, Filter, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function VenuePage() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
const navigate=useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/api/venues")
      .then((response) => {
        setVenues(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching venues", error);
        setLoading(false);
      });
  }, []);
const redirect=(id)=>{
  navigate(`/VenueInnerPage/:${id}`);
  window.scroll(0,0);
}
  const VenueCard = ({ id,image, title, rating, review, location, type, vegprice, nonvegprice, capacity, room, more }) => (
    
    <div onClick={()=>redirect(id)} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-pink-200 hover:-translate-y-2">
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
        
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
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
        <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-orange-50 rounded-xl">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Vegetarian</span>
              </div>
              <div className="text-lg font-bold text-gray-900">₹{vegprice}</div>
              <div className="text-xs text-gray-500">per plate</div>
            </div>
            
            <div className="w-px h-12 bg-gray-200"></div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-sm font-medium text-gray-700">Non-Veg</span>
              </div>
              <div className="text-lg font-bold text-gray-900">₹{nonvegprice}</div>
              <div className="text-xs text-gray-500">per plate</div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full">
            <Users size={14} className="text-blue-500" />
            <span className="text-sm text-blue-700 font-medium">{capacity} guests</span>
          </div>
          
          <div className="flex items-center space-x-1 bg-purple-50 px-3 py-1 rounded-full">
            <Bed size={14} className="text-purple-500" />
            <span className="text-sm text-purple-700 font-medium">{room} rooms</span>
          </div>
          
          <div className="bg-gray-50 px-3 py-1 rounded-full">
            <span className="text-sm text-gray-600 font-medium">+{more} more</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
            View Details
          </button>
          <button className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-all duration-300">
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
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Wedding Venues
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Discover the perfect venue for your special day
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              <span className="font-medium text-gray-900">{venues.length}</span> venues found
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
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Capacity</option>
                  <option>50-100</option>
                  <option>100-300</option>
                  <option>300+</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Price Range</option>
                  <option>₹500-1000</option>
                  <option>₹1000-2000</option>
                  <option>₹2000+</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
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