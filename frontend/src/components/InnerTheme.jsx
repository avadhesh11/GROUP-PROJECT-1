import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Heart, Star, Share2, Palette, Image, MapPin, Users, Calendar, Mail, Phone, Send, MessageCircle, ArrowLeft, Sparkles, Eye, Package, Lightbulb } from 'lucide-react';
import { useParams } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_API_URL;
function ThemeInnerPage() {
  const [phoneCode, setPhoneCode] = useState('+91');
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [themeData, setThemeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventDate: '',
    eventType: '',
    guests: '',
    budget: '',
    message: ''
  });

  const { id } = useParams();
  const cleanid = id.replace(":", "");
  console.log("id:", id);
  console.log("clearid:", cleanid);

  useEffect(() => {
    if (!cleanid) {
      setError('Theme ID not provided');
      setLoading(false);
      return;
    }

    axios.get(`${BACKEND_URL}/api/themes/${cleanid}`)
      .then(res => {
        console.log(res.data)
        setLoading(false);
        setThemeData(res.data)
      })
      .catch(err => {
        setLoading(false);
        console.error("Error fetching theme details:", err)
      });
  }, [cleanid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShortlist = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/themes/${themeData._id}/shortlist`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.status === 200) {
        setIsShortlisted(!isShortlisted);
      }
    } catch (err) {
      console.error('Error updating shortlist:', err);
      setIsShortlisted(!isShortlisted);
    }
  };

  const handleSubmitEnquiry = async () => {
    if (!formData.fullName || !formData.phone || !formData.email || !formData.guests) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/theme-enquiries`, {
        themeId: themeData._id,
        themeName: themeData.title,
        ...formData,
        phoneCode
      });

      if (response.status === 200 || response.status === 201) {
        alert('Enquiry submitted successfully!');
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          eventDate: '',
          eventType: '',
          guests: '',
          budget: '',
          message: ''
        });
      }
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      alert('Failed to submit enquiry. Please try again.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: themeData.title,
        text: `Check out this amazing theme: ${themeData.title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+971', country: 'UAE' },
    { code: '+61', country: 'Australia' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+92', country: 'Pakistan' }
  ];

  const eventTypes = [
    'Wedding', 'Engagement', 'Birthday', 'Anniversary', 'Corporate Event', 
    'Baby Shower', 'Reception', 'Sangeet', 'Mehendi', 'Other'
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading theme details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !themeData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-500 dark:text-red-400 text-lg mb-2">Error loading theme details</p>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Themes</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Section */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl dark:shadow-gray-900/50 group">
              <img 
                src={themeData.image || themeData.images?.[0]} 
                alt={themeData.title}
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Theme Info Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <div className="mb-3">
                  <span className="bg-white/10 dark:bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center w-fit">
                    <Palette size={14} className="mr-1" />
                    {themeData.category || 'Theme'}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{themeData.title}</h1>
                <div className="flex items-center space-x-4 text-lg mb-3">
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2" />
                    <span className="text-gray-200">{themeData.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {themeData.rating && (
                    <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full">
                      <Star size={16} className="text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{themeData.rating}</span>
                      <span className="ml-1 text-sm">({themeData.review} reviews)</span>
                    </div>
                  )}
                  <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full">
                    <Sparkles size={16} className="mr-1" />
                    <span className="text-sm">Premium Setup</span>
                  </div>
                </div>
              </div>

              {/* Top Right Actions */}
              <div className="absolute top-6 right-6 flex space-x-3">
                <button 
                  onClick={handleShortlist}
                  className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                    isShortlisted 
                      ? 'bg-red-500/90 hover:bg-red-600/90 border-red-500/50' 
                      : 'bg-white/10 hover:bg-white/20 border-white/20'
                  }`}
                >
                  <Heart 
                    size={20} 
                    className={`transition-colors ${
                      isShortlisted 
                        ? 'text-white fill-current' 
                        : 'text-white hover:text-red-400'
                    }`} 
                  />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <Share2 size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Photo Toolbar */}
            <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-4 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/50 hover:bg-purple-100 dark:hover:bg-purple-800/50 border border-purple-200 dark:border-purple-700/50 rounded-xl transition-colors group">
                    <Image size={18} className="text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-purple-700 dark:text-purple-300 font-medium">{themeData.gallery?.length || '25'} Photos</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/50 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 border border-indigo-200 dark:border-indigo-700/50 rounded-xl transition-colors group">
                    <Eye size={18} className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span className="text-indigo-700 dark:text-indigo-300 font-medium">360° View</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 dark:bg-gray-700/50 hover:bg-yellow-50 dark:hover:bg-yellow-900/50 border border-gray-200 dark:border-gray-600 hover:border-yellow-300 dark:hover:border-yellow-700/50 rounded-xl transition-colors group">
                    <Star size={18} className="text-gray-600 dark:text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 group-hover:scale-110 transition-all" />
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-yellow-700 dark:group-hover:text-yellow-300 font-medium">Write Review</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Theme Details Section */}
            <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 transition-colors duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Theme Overview</h3>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/30 rounded-xl transition-colors duration-300">
                  <Package size={24} className="mx-auto text-purple-600 dark:text-purple-400 mb-2" />
                  <div className="font-bold text-purple-700 dark:text-purple-300">Complete</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Setup</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700/30 rounded-xl transition-colors duration-300">
                  <Users size={24} className="mx-auto text-indigo-600 dark:text-indigo-400 mb-2" />
                  <div className="font-bold text-indigo-700 dark:text-indigo-300">{themeData.maxGuests || '500'}+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Max Guests</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700/30 rounded-xl transition-colors duration-300">
                  <Star size={24} className="mx-auto text-yellow-600 dark:text-yellow-400 mb-2" />
                  <div className="font-bold text-yellow-700 dark:text-yellow-300">{themeData.rating || '4.8'}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/30 rounded-xl transition-colors duration-300">
                  <Lightbulb size={24} className="mx-auto text-green-600 dark:text-green-400 mb-2" />
                  <div className="font-bold text-green-700 dark:text-green-300">Custom</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Design</div>
                </div>
              </div>

              {/* Theme Elements */}
              {themeData.elements && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What's Included</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {themeData.elements.split(', ').map((element, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400"></div>
                        <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">{element}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Palette */}
              {themeData.colorPalette && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Color Palette</h4>
                  <div className="flex space-x-4">
                    {themeData.colorPalette.map((color, index) => (
                      <div key={index} className="text-center">
                        <div 
                          className="w-14 h-14 rounded-full shadow-lg border-2 border-gray-300 dark:border-gray-600 mb-2 hover:scale-110 transition-transform cursor-pointer" 
                          style={{ backgroundColor: color }}
                        ></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suitable Events */}
              {themeData.suitableEvents && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Perfect For</h4>
                  <div className="flex flex-wrap gap-2">
                    {themeData.suitableEvents.map((event, index) => (
                      <span 
                        key={index}
                        className="px-3 py-2 bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-700/40 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-800/50 hover:border-indigo-300 dark:hover:border-indigo-600/50 transition-all cursor-pointer"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {themeData.description && (
              <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 transition-colors duration-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Theme</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">{themeData.description}</p>
              </div>
            )}

            {/* Setup Process */}
            <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 transition-colors duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Setup Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 border border-purple-200 dark:border-purple-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-700 dark:text-purple-300 font-bold text-lg">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Planning</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Design consultation and space planning</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-indigo-700 dark:text-indigo-300 font-bold text-lg">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Setup</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Professional installation on event day</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-700 dark:text-green-300 font-bold text-lg">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Support</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Event day coordination and breakdown</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 sticky top-24 transition-colors duration-300">
              {/* Pricing Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="w-2 h-6 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full mr-3"></span>
                  Theme Package
                </h3>
                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/40 dark:to-indigo-900/40 border border-purple-200 dark:border-purple-700/30 rounded-xl mb-4 transition-colors duration-300">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">₹{parseInt(themeData.price).toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">complete setup</div>
                  <div className="text-xs text-purple-700 dark:text-purple-300 font-medium bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-purple-200 dark:border-white/20 px-3 py-1 rounded-full inline-block">
                    Customizable Package
                  </div>
                </div>

                {/* Package Highlights */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors duration-300">
                    <span className="text-gray-600 dark:text-gray-400">Setup Time:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-200">4-6 hours</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors duration-300">
                    <span className="text-gray-600 dark:text-gray-400">Team Size:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-200">8-12 professionals</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors duration-300">
                    <span className="text-gray-600 dark:text-gray-400">Breakdown:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">Included</span>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <MessageCircle size={18} className="mr-2 text-purple-600 dark:text-purple-400" />
                  Get Custom Quote
                </h4>
                
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />

                <div className="flex space-x-2">
                  <select
                    className="px-3 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    value={phoneCode}
                    onChange={(e) => setPhoneCode(e.target.value)}
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code} className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">
                        {country.country} {country.code}
                      </option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />

                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all [color-scheme:dark]"
                />

                <div className="grid grid-cols-1 gap-3">
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">Select Event Type</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type} className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">{type}</option>
                    ))}
                  </select>
                  
                  <div className="relative">
                    <Users size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                    <input
                      type="number"
                      name="guests"
                      placeholder="Expected Guests *"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">Budget Range</option>
                    <option value="25000-50000" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">₹25,000 - ₹50,000</option>
                    <option value="50000-100000" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">₹50,000 - ₹1,00,000</option>
                    <option value="100000-200000" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">₹1,00,000 - ₹2,00,000</option>
                    <option value="200000+" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">₹2,00,000+</option>
                  </select>

                  <textarea
                    name="message"
                    placeholder="Special requirements or message..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={handleSubmitEnquiry}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 dark:hover:from-purple-700 dark:hover:to-indigo-800 transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-gray-900/50 flex items-center justify-center group"
                  >
                    <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
                    Get Quote
                  </button>
                  <button 
                    onClick={() => window.open(`tel:${phoneCode}1234567890`)}
                    className="px-6 py-3 border-2 border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-xl font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-600 dark:hover:border-purple-300 transition-all duration-300 flex items-center justify-center group"
                  >
                    <Phone size={16} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-300">
                  Free consultation • Custom designs available
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeInnerPage;