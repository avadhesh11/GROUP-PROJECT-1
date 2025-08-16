import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Heart, Star, Share2, Palette, Image, MapPin, Users, Calendar, Mail, Phone, Send, MessageCircle, ArrowLeft, Sparkles, Eye, Package, Lightbulb } from 'lucide-react';
import { useParams } from "react-router-dom";

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

    axios.get(`http://localhost:5000/api/themes/${cleanid}`)
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
      const response = await axios.post(`http://localhost:5000/api/themes/${themeData._id}/shortlist`, {}, {
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
      const response = await axios.post('http://localhost:5000/api/theme-enquiries', {
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading theme details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !themeData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-2">Error loading theme details</p>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors mb-6"
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src={themeData.image || themeData.images?.[0]} 
                alt={themeData.title}
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Theme Info Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <div className="mb-3">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
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
                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star size={16} className="text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{themeData.rating}</span>
                      <span className="ml-1 text-sm">({themeData.review} reviews)</span>
                    </div>
                  )}
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Sparkles size={16} className="mr-1" />
                    <span className="text-sm">Premium Setup</span>
                  </div>
                </div>
              </div>

              {/* Top Right Actions */}
              <div className="absolute top-6 right-6 flex space-x-3">
                <button 
                  onClick={handleShortlist}
                  className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    isShortlisted 
                      ? 'bg-red-500/90 hover:bg-red-600/90' 
                      : 'bg-white/20 hover:bg-white/30'
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
                  className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                >
                  <Share2 size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Photo Toolbar */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group">
                    <Image size={18} className="text-purple-600 group-hover:scale-110 transition-transform" />
                    <span className="text-purple-700 font-medium">{themeData.gallery?.length || '25'} Photos</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors group">
                    <Eye size={18} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                    <span className="text-indigo-700 font-medium">360° View</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-yellow-50 rounded-xl transition-colors group">
                    <Star size={18} className="text-gray-600 group-hover:text-yellow-600 group-hover:scale-110 transition-all" />
                    <span className="text-gray-700 font-medium">Write Review</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Theme Details Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Theme Overview</h3>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Package size={24} className="mx-auto text-purple-500 mb-2" />
                  <div className="font-bold text-purple-700">Complete</div>
                  <div className="text-sm text-gray-600">Setup</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-xl">
                  <Users size={24} className="mx-auto text-indigo-500 mb-2" />
                  <div className="font-bold text-indigo-700">{themeData.maxGuests || '500'}+</div>
                  <div className="text-sm text-gray-600">Max Guests</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <Star size={24} className="mx-auto text-yellow-500 mb-2" />
                  <div className="font-bold text-yellow-700">{themeData.rating || '4.8'}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Lightbulb size={24} className="mx-auto text-green-500 mb-2" />
                  <div className="font-bold text-green-700">Custom</div>
                  <div className="text-sm text-gray-600">Design</div>
                </div>
              </div>

              {/* Theme Elements */}
              {themeData.elements && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {themeData.elements.split(', ').map((element, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <span className="text-gray-700">{element}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Palette */}
              {themeData.colorPalette && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Color Palette</h4>
                  <div className="flex space-x-3">
                    {themeData.colorPalette.map((color, index) => (
                      <div key={index} className="text-center">
                        <div 
                          className="w-12 h-12 rounded-full shadow-md mb-2" 
                          style={{ backgroundColor: color }}
                        ></div>
                        <span className="text-xs text-gray-600">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suitable Events */}
              {themeData.suitableEvents && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Perfect For</h4>
                  <div className="flex flex-wrap gap-2">
                    {themeData.suitableEvents.map((event, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
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
              <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About This Theme</h3>
                <p className="text-gray-700 leading-relaxed">{themeData.description}</p>
              </div>
            )}

            {/* Setup Process */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Setup Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Planning</h4>
                  <p className="text-sm text-gray-600">Design consultation and space planning</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-indigo-600 font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Setup</h4>
                  <p className="text-sm text-gray-600">Professional installation on event day</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
                  <p className="text-sm text-gray-600">Event day coordination and breakdown</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Pricing Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full mr-3"></span>
                  Theme Package
                </h3>
                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-2">₹{parseInt(themeData.price).toLocaleString()}</div>
                  <div className="text-sm text-gray-600 mb-3">complete setup</div>
                  <div className="text-xs text-purple-600 font-medium bg-white/80 px-3 py-1 rounded-full inline-block">
                    Customizable Package
                  </div>
                </div>

                {/* Package Highlights */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Setup Time:</span>
                    <span className="font-medium">4-6 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Team Size:</span>
                    <span className="font-medium">8-12 professionals</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Breakdown:</span>
                    <span className="font-medium text-green-600">Included</span>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 flex items-center">
                  <MessageCircle size={18} className="mr-2 text-purple-600" />
                  Get Custom Quote
                </h4>
                
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />

                <div className="flex space-x-2">
                  <select
                    className="px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    value={phoneCode}
                    onChange={(e) => setPhoneCode(e.target.value)}
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
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
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />

                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />

                <div className="grid grid-cols-1 gap-3">
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Event Type</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  
                  <div className="relative">
                    <Users size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="guests"
                      placeholder="Expected Guests *"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">Budget Range</option>
                    <option value="25000-50000">₹25,000 - ₹50,000</option>
                    <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                    <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                    <option value="200000+">₹2,00,000+</option>
                  </select>

                  <textarea
                    name="message"
                    placeholder="Special requirements or message..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={handleSubmitEnquiry}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group"
                  >
                    <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
                    Get Quote
                  </button>
                  <button 
                    onClick={() => window.open(`tel:${phoneCode}1234567890`)}
                    className="px-6 py-3 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center group"
                  >
                    <Phone size={16} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                <div className="text-center text-xs text-gray-500 mt-4">
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