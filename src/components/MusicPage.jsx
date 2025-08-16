import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Star, MapPin, Music, Heart, Filter, ChevronDown, Play, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function MusicAndDance() {
  const [performers, setPerformers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
 const navigate =useNavigate();
useEffect(() => {
  axios.get("http://localhost:5000/api/music")
    .then((response) => {
      setPerformers(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching music data", error);
      setLoading(false);
    });
}, []);
const redirect=(id)=>{
  navigate(`/MusicInnerPage/:${id}`);
  window.scroll(0,0);
}

  const PerformerCard = ({ image, title, rating, review, location, price, photos, experience, speciality, duration, teamSize }) => (
   <div onClick={()=>redirect(id)} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-pink-200 hover:-translate-y-2">
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
            <Music size={14} className="mr-1" />
            {speciality || "Music & Dance"}
          </span>
        </div>
        
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
          <Heart size={18} className="text-white group-hover:text-purple-400 group-hover:fill-current transition-colors" />
        </button>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:bg-white transition-colors">
            <Play size={24} className="text-purple-600 ml-1" />
          </button>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="text-sm font-semibold text-gray-800">{rating}</span>
          <span className="text-xs text-gray-600">({review} reviews)</span>
        </div>

        {/* Experience Badge */}
        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full">
          <span className="text-xs font-semibold">{experience || "5+ years"}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-1 text-purple-500" />
            <span className="text-sm truncate">{location}</span>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">₹{parseInt(price).toLocaleString()}</div>
            <div className="text-sm text-gray-600">per event</div>
            <div className="mt-2 text-xs text-purple-600 font-medium">Complete performance package</div>
          </div>
        </div>

        {/* Performance Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
            <Clock size={14} className="text-blue-500" />
            <div>
              <div className="text-xs text-gray-500">Duration</div>
              <div className="text-sm font-medium text-blue-700">{duration || "4 hours"}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
            <Users size={14} className="text-green-500" />
            <div>
              <div className="text-xs text-gray-500">Team Size</div>
              <div className="text-sm font-medium text-green-700">{teamSize || "10+ members"}</div>
            </div>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-1 bg-orange-50 px-3 py-1 rounded-full">
            <Music size={14} className="text-orange-500" />
            <span className="text-sm text-orange-700 font-medium">{photos} performances</span>
          </div>
          
          <div className="bg-purple-50 px-3 py-1 rounded-full">
            <span className="text-sm text-purple-700 font-medium">Professional</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
            <Play size={16} className="mr-2" />
            View Performances
          </button>
          <button className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-300">
            <Heart size={18} className="text-gray-600 hover:text-purple-500" />
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
             Music and Dance
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
             Celebrate your special day with unforgettable music and dance
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              <span className="font-medium text-gray-900">{performers.length}</span> performers found
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
                  <option>Ratlam</option>
                  <option>Hyderabad</option>
                  <option>Chennai</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Performance Type</option>
                  <option>Classical Dance</option>
                  <option>Bollywood</option>
                  <option>Folk Dance</option>
                  <option>Live Music</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Price Range</option>
                  <option>₹25,000-50,000</option>
                  <option>₹50,000-1,00,000</option>
                  <option>₹1,00,000+</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Team Size</option>
                  <option>Solo Artist</option>
                  <option>5-10 members</option>
                  <option>10+ members</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Performers Grid */}
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
            {performers.map((performer) => (
              <PerformerCard key={performer._id} id={performer._id} {...performer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MusicAndDance;