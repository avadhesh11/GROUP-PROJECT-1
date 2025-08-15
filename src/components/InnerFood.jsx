import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Heart, Star, Share2, Globe, Image, MapPin, Users, Utensils, Calendar, Mail, Phone, Send, MessageCircle, ArrowLeft, ChefHat, Clock, Award } from 'lucide-react';

function FoodDetail({ foodId }) {
  const [phoneCode, setPhoneCode] = useState('+91');
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventDate: '',
    guests: '',
    menuType: 'vegetarian',
    specialRequests: ''
  });

  useEffect(() => {
    if (!foodId) {
      setError('Food ID not provided');
      setLoading(false);
      return;
    }
    
        axios.get(`http://localhost:5000/api/venues/${foodId}`)
          .then((response) => {
            console.log('Venue details fetched:', response.data);
            setFoodData(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching venue details:", error);
            setError('Failed to load venue details');
            setLoading(false);
          });
  }, [foodId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShortlist = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/foods/${foodData._id}/shortlist`, {}, {
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
      const response = await axios.post('http://localhost:5000/api/food-enquiries', {
        foodId: foodData._id,
        catererName: foodData.title,
        ...formData,
        phoneCode
      });

      if (response.status === 200 || response.status === 201) {
        alert('Enquiry submitted successfully!');
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          eventDate: '',
          guests: '',
          menuType: 'vegetarian',
          specialRequests: ''
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
        title: foodData.title,
        text: `Check out this amazing caterer: ${foodData.title}`,
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

  const sampleMenuItems = [
    { category: 'Starters', items: ['Paneer Tikka', 'Veg Spring Rolls', 'Stuffed Mushrooms', 'Aloo Tikki'] },
    { category: 'Main Course', items: ['Dal Makhani', 'Paneer Butter Masala', 'Mix Veg Curry', 'Jeera Rice'] },
    { category: 'Breads', items: ['Butter Naan', 'Roti', 'Garlic Naan', 'Laccha Paratha'] },
    { category: 'Desserts', items: ['Gulab Jamun', 'Rasmalai', 'Ice Cream', 'Fruit Salad'] }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading caterer details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !foodData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-2">Error loading caterer details</p>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
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
          className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Caterers</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Section */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src={foodData.image || '/api/placeholder/800/500'} 
                alt={foodData.title}
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Caterer Info Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <div className="mb-3">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {foodData.type} Cuisine
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{foodData.title}</h1>
                <div className="flex items-center space-x-4 text-lg mb-3">
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2" />
                    <span className="text-gray-200">{foodData.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star size={16} className="text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{foodData.rating}</span>
                    <span className="ml-1 text-sm">({foodData.review} reviews)</span>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <ChefHat size={16} className="mr-1" />
                    <span className="text-sm">Professional Caterer</span>
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
                        : 'text-white hover:text-pink-400'
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

            {/* Action Toolbar */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
                    <Image size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="text-blue-700 font-medium">View Gallery</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
                    <Utensils size={18} className="text-green-600 group-hover:scale-110 transition-transform" />
                    <span className="text-green-700 font-medium">Sample Menu</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-yellow-50 rounded-xl transition-colors group">
                    <Star size={18} className="text-gray-600 group-hover:text-yellow-600 group-hover:scale-110 transition-all" />
                    <span className="text-gray-700 font-medium">Write Review</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Service Details Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Service Details</h3>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <Utensils size={24} className="mx-auto text-orange-500 mb-2" />
                  <div className="font-bold text-orange-700">₹{foodData.price}</div>
                  <div className="text-sm text-gray-600">Per Plate</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Users size={24} className="mx-auto text-green-500 mb-2" />
                  <div className="font-bold text-green-700">500+</div>
                  <div className="text-sm text-gray-600">Min Order</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <Star size={24} className="mx-auto text-yellow-500 mb-2" />
                  <div className="font-bold text-yellow-700">{foodData.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Clock size={24} className="mx-auto text-purple-500 mb-2" />
                  <div className="font-bold text-purple-700">2-3</div>
                  <div className="text-sm text-gray-600">Hours Setup</div>
                </div>
              </div>

              {/* Service Features */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Service Features</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'Live Counter Service',
                    'Buffet Setup',
                    'Professional Staff',
                    'Fresh Ingredients',
                    'Customizable Menu',
                    'Event Coordination',
                    'Quality Assurance',
                    'Hygienic Preparation',
                    'Timely Service'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sample Menu */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sample Menu</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleMenuItems.map((menu, index) => (
                  <div key={index} className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Utensils size={16} className="mr-2 text-orange-500" />
                      {menu.category}
                    </h4>
                    <ul className="space-y-2">
                      {menu.items.map((item, idx) => (
                        <li key={idx} className="text-gray-700 text-sm flex items-center">
                          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">*Menu can be customized according to your preferences</p>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About This Caterer</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Experience exceptional culinary services with our professional catering team. We specialize in {foodData.type} cuisine 
                and have been serving memorable meals for weddings and special events. Our commitment to quality, freshness, and 
                customer satisfaction makes us the preferred choice for your celebration.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Award size={16} className="mr-1 text-gold-500" />
                  <span>5+ Years Experience</span>
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-1 text-blue-500" />
                  <span>1000+ Events Served</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Pricing Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></span>
                  Pricing
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                    <div className="flex items-center">
                      <Utensils size={18} className="text-orange-600 mr-2" />
                      <span className="text-orange-700 font-semibold">{foodData.type} Menu</span>
                    </div>
                    <span className="text-2xl font-bold text-orange-800">₹{foodData.price}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center">per plate (minimum 500 plates)</div>
              </div>

              {/* Package Options */}
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                  <ChefHat size={18} className="mr-2 text-green-600" />
                  Premium Package
                </h4>
                <div className="text-sm text-gray-700">
                  <div className="text-xl font-bold text-green-800 mb-1">₹{foodData.price + 150}</div>
                  <div>per plate</div>
                  <div className="text-xs text-gray-600 mt-1">Includes: Premium Menu + Live Counters + Extra Staff</div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 flex items-center">
                  <MessageCircle size={18} className="mr-2 text-orange-600" />
                  Get Quote
                </h4>
                
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />

                <div className="flex space-x-2">
                  <select
                    className="px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />

                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Users size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="guests"
                      placeholder="Guests *"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <select
                    name="menuType"
                    value={formData.menuType}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non-vegetarian">Non-Vegetarian</option>
                    <option value="mixed">Mixed</option>
                    <option value="jain">Jain</option>
                  </select>
                </div>

                <textarea
                  name="specialRequests"
                  placeholder="Special requests or dietary requirements..."
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all h-20 resize-none"
                />

                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={handleSubmitEnquiry}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group"
                  >
                    <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
                    Get Quote
                  </button>
                  <button 
                    onClick={() => window.open(`tel:${phoneCode}1234567890`)}
                    className="px-6 py-3 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 flex items-center justify-center group"
                  >
                    <Phone size={16} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDetail;