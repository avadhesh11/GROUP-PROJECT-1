import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Star, MapPin, Camera, Heart, Filter, ChevronDown, Play, Image, Award, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_API_URL;
function Photography() {
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/photography`)
      .then(response => {
        setPhotographers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching photography data:", error);
        setLoading(false);
      });
  }, []);

  const redirect = (id) => {
    navigate(`/PhotographyInnerPage/:${id}`);
    window.scroll(0, 0);
  }

  const PhotographerCard = ({ id, image, title, rating, review, location, price, photos, videos, experience, speciality, packageType, deliveryTime, awards }) => (
    <div onClick={() => redirect(id)} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-gray-700/50 dark:hover:shadow-gray-600/50 transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-400 hover:-translate-y-2 cursor-pointer">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
     
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <Camera size={14} className="mr-1" />
            {speciality || 'Photo + Video'}
          </span>
        </div>
        
        <button 
          onClick={(e) => e.stopPropagation()} 
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300 group"
        >
          <Heart size={18} className="text-white group-hover:text-pink-400 group-hover:fill-current transition-colors" />
        </button>

  
        <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{rating}</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">({review} reviews)</span>
        </div>

        
        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full">
          <span className="text-xs font-semibold">{experience}</span>
        </div>
      </div>


      <div className="p-6">
       
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <MapPin size={16} className="mr-1 text-pink-500 dark:text-pink-400" />
            <span className="text-sm truncate">{location}</span>
          </div>
        </div>
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">₹{parseInt(price).toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">per day</div>
            <div className="mt-2 text-xs text-purple-600 dark:text-purple-400 font-medium">
              {packageType || 'All-inclusive package'}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-1 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full border dark:border-green-800">
            <Image size={14} className="text-green-500 dark:text-green-400" />
            <span className="text-sm text-green-700 dark:text-green-300 font-medium">{photos || '500'}+</span>
          </div>
          
          <div className="flex items-center space-x-1 bg-red-50 dark:bg-red-900/30 px-3 py-1 rounded-full border dark:border-red-800">
            <Play size={14} className="text-red-500 dark:text-red-400" />
            <span className="text-sm text-red-700 dark:text-red-300 font-medium">{videos || '25'} videos</span>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/30 px-3 py-1 rounded-full border dark:border-yellow-800">
            <span className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
              {awards ? 'Award Winner' : 'Pro'}
            </span>
          </div>
        </div>

       
        <div className="flex justify-between items-center mb-4">
          {deliveryTime && (
            <div className="flex items-center space-x-1 bg-orange-50 dark:bg-orange-900/30 px-3 py-1 rounded-full border dark:border-orange-800">
              <Clock size={14} className="text-orange-500 dark:text-orange-400" />
              <span className="text-sm text-orange-700 dark:text-orange-300 font-medium">{deliveryTime}</span>
            </div>
          )}
          
          <div className="flex items-center space-x-1 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full border dark:border-indigo-800">
            <Users size={14} className="text-indigo-500 dark:text-indigo-400" />
            <span className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">Team of 3</span>
          </div>
          
          {awards && (
            <div className="flex items-center space-x-1 bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-full border dark:border-purple-800">
              <Award size={14} className="text-purple-500 dark:text-purple-400" />
              <span className="text-sm text-purple-700 dark:text-purple-300 font-medium">Certified</span>
            </div>
          )}
        </div>

       
        <div className="flex space-x-3">
          <button 
            onClick={(e) => e.stopPropagation()} 
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 dark:hover:from-pink-700 dark:hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-gray-900/50"
          >
            View Portfolio
          </button>
          <button 
            onClick={(e) => e.stopPropagation()} 
            className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-pink-300 dark:hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300"
          >
            <Heart size={18} className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-700 dark:from-pink-700 dark:via-purple-800 dark:to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
               Photography
            </h1>
            <p className="text-xl text-pink-100 dark:text-pink-200 max-w-2xl mx-auto">
              Capture your precious moments with professional photographers
            </p>
          </div>
        </div>
      </div>

   
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-600 dark:text-gray-300">
              <span className="font-medium text-gray-900 dark:text-white">{photographers.length}</span> photographers found
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
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400">
                  <option>Location</option>
                  <option>Delhi</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                  <option>Chennai</option>
                  <option>Kolkata</option>
                  <option>Ratlam</option>
                </select>
                <select className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400">
                  <option>Price Range</option>
                  <option>₹15,000-30,000</option>
                  <option>₹30,000-50,000</option>
                  <option>₹50,000-1,00,000</option>
                  <option>₹1,00,000+</option>
                </select>
                <select className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400">
                  <option>Experience</option>
                  <option>1-3 years</option>
                  <option>3-5 years</option>
                  <option>5-10 years</option>
                  <option>10+ years</option>
                </select>
                <select className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400">
                  <option>Service Type</option>
                  <option>Photography Only</option>
                  <option>Videography Only</option>
                  <option>Photo + Video</option>
                  <option>Cinematic</option>
                  <option>Traditional</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

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
                  <div className="flex justify-between mb-4">
                    <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
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
            {photographers.map((photographer) => (
              <PhotographerCard key={photographer._id} id={photographer._id} {...photographer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Photography;