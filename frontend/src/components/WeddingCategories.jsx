import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Heart, Star, MapPin, Calendar } from 'lucide-react';
const BACKEND_URL = import.meta.env.VITE_API_URL;

function WeddingCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/categories`)
      .then((response) => {
        console.log("Fetched categories:", response.data);
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching categories", error);
        setLoading(false);
      });
  }, []);

  const Categories_card = ({ image, title, to }) => {
    const navigate = useNavigate();

    const redirect = () => {
      console.log(to);
      navigate(`/${to}`);
       window.scrollTo(0,0);
    };

    return (
      <div 
        onClick={redirect}
        className="group dark:bg-gray-800   cursor-pointer relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-pink-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
      >
      
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
          <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
            <Heart size={18} className="text-white" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl dark:text-white font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
              {title}
            </h3>
            <ChevronRight size={20} className="text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all duration-300" />
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span>4.8</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin size={14} />
              <span>500+ options</span>
            </div>
          </div>

        
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="dark:bg-gray-900 min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />
      <div className="dark:bg-gray-900">
     
      <div className="relative text-white w-full h-screen">
 <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
  <source src="/GROUP-PROJECT-1/video.mp4" alt="unable to load video" type="video/mp4" />
</video>
  <div className="absolute  inset-0 bg-black/40"></div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
        Your Dream Wedding
      </h1>
      <p className="text-xl md:text-2xl text-pink-100 mb-8 max-w-3xl mx-auto">
        Plan the perfect celebration with our comprehensive wedding services
      </p>
      <div className="flex dark:bg-gray-900 items-center justify-center space-x-8 text-pink-200">

      </div>
    </div>
  </div>
</div>


    
      <div className="max-w-7xl dark:bg-gray-900 mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl dark:text-white md:text-4xl font-bold text-gray-900 mb-4">
            Wedding Categories
          </h2>
          <p className="text-[180%] dark:text-white text-gray-600 ">
            Discover everything you need to make your special day unforgettable
          </p>
        </div>

        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Categories_card key={category._id} {...category} />
          ))}
        </div>
      </div>

     
      <div className=" dark:bg-gray-900 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-2xl font-bold mb-4">
              Ready to Start Planning?
              </h3>
              <h3 className="text-2xl md:text-4xl font-bold mb-4">
              USE OUR AI TOOL FOR FREE
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Get personalized recommendations using our AI model under your budget
            <br />
            !!CURRENTLY NOT AVAIALABLE!!
            </p>
            <button onClick={()=>alert("This feature is still under development.We will update you once it gets launched!")} className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default WeddingCategories;