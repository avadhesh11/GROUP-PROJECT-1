import React, { useState, useEffect } from 'react';
import { Heart, Star, Share2, Image, MapPin, Users, ChefHat, Send, Phone, ArrowLeft, Clock, Award } from 'lucide-react';

// Mock Navbar component
const Navbar = () => (
  <nav className="bg-white shadow-lg border-b">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            FoodieBooker
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">Home</a>
          <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">Caterers</a>
          <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">About</a>
          <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">Contact</a>
        </div>
      </div>
    </div>
  </nav>
);

function FoodVenueDetail({ venueId = "mock" }) {
  const [phoneCode, setPhoneCode] = useState('+91');
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [venueData, setVenueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    weddingDate: '',
    guests1: '',
    guests2: ''
  });

  // Mock data for food venue
  const mockFoodVenueData = {
    _id: "food123",
    title: "Shri Ram Hotel & Catering",
    location: "123 Celebration Street, Jaipur, Rajasthan",
    type: "Non-Veg",
    foodType: "Multi-Cuisine",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    rating: "4.6",
    review: "189",
    startingPrice: "500",
    experience: "15+ years",
    minOrder: "100",
    more: "150",
    cuisines: ["North Indian", "South Indian", "Chinese", "Continental", "Rajasthani", "Gujarati"],
    specialities: ["Wedding Catering", "Corporate Events", "Birthday Parties", "Anniversary Celebrations"],
    services: ["Home Delivery", "Event Catering", "Bulk Orders", "Custom Menu", "Live Cooking", "Service Staff"],
    description: "Shri Ram Hotel & Catering brings you the finest culinary experience with over 15 years of expertise in event catering. Our master chefs craft delicious multi-cuisine menus that cater to all taste preferences. From intimate gatherings to grand celebrations, we ensure every dish is prepared with love and served with excellence."
  };

  useEffect(() => {
    // Simulate API call
    const fetchVenueData = () => {
      setLoading(true);
      setTimeout(() => {
        if (venueId === "error") {
          setError('Failed to load food venue details');
        } else {
          setVenueData(mockFoodVenueData);
        }
        setLoading(false);
      }, 1500);
    };

    fetchVenueData();
  }, [venueId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShortlist = () => {
    setIsShortlisted(!isShortlisted);
  };

  const handleSubmitEnquiry = () => {
    if (!formData.fullName || !formData.phone || !formData.email || !formData.guests1) {
      alert('Please fill in all required fields');
      return;
    }

    alert('Enquiry submitted successfully!');
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      weddingDate: '',
      guests1: '',
      guests2: ''
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: venueData.title,
        text: `Check out this amazing food service: ${venueData.title}`,
        url: window.location.href
      });
    } else {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading food venue details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !venueData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-2">Error loading food venue details</p>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
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
          className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Food Services</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Image Section */}
          <div className="lg:flex-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src={venueData.image} 
                alt={venueData.title}
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Food Service Info Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <div className="mb-3 flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    venueData.type === 'Veg' 
                      ? 'bg-green-500/80 text-white' 
                      : 'bg-red-500/80 text-white'
                  }`}>
                    {venueData.type}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {venueData.foodType}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{venueData.title}</h1>
                <div className="flex items-center space-x-4 text-sm mb-3">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-gray-200">{venueData.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star size={14} className="text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold text-sm">{venueData.rating}</span>
                    <span className="ml-1 text-xs">({venueData.review} reviews)</span>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Clock size={14} className="mr-1" />
                    <span className="text-xs">{venueData.experience} experience</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Toolbar */}
            <div className="mt-4 bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <Image size={16} className="text-blue-600" />
                    <span className="text-blue-700 font-medium text-sm">{venueData.more} Photos</span>
                  </button>
                  
                  <button 
                    onClick={handleShortlist}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isShortlisted 
                        ? 'bg-red-50 hover:bg-red-100' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <Heart 
                      size={16} 
                      className={`${
                        isShortlisted 
                          ? 'text-red-600 fill-current' 
                          : 'text-gray-600'
                      }`} 
                    />
                    <span className={`font-medium text-sm ${
                      isShortlisted ? 'text-red-700' : 'text-gray-700'
                    }`}>
                      {isShortlisted ? 'Shortlisted' : 'Shortlist'}
                    </span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-3 py-2 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                    <Star size={16} className="text-yellow-600" />
                    <span className="text-yellow-700 font-medium text-sm">Review</span>
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-3 py-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <Share2 size={16} className="text-green-600" />
                    <span className="text-green-700 font-medium text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Description and Services */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About This Food Service</h3>
              <p className="text-gray-700 leading-relaxed mb-6">{venueData.description}</p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <ChefHat size={24} className="mx-auto text-orange-500 mb-2" />
                  <div className="font-bold text-orange-700">{venueData.experience}</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Users size={24} className="mx-auto text-green-500 mb-2" />
                  <div className="font-bold text-green-700">{venueData.minOrder}+</div>
                  <div className="text-sm text-gray-600">Min Order</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <Award size={24} className="mx-auto text-yellow-500 mb-2" />
                  <div className="font-bold text-yellow-700">{venueData.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>

              {/* Cuisines */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Cuisines Available</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {venueData.cuisines.map((cuisine, index) => (
                    <span 
                      key={index}
                      className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium text-center"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialities */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Specialities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {venueData.specialities.map((speciality, index) => (
                    <span 
                      key={index}
                      className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium text-center"
                    >
                      {speciality}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Services Offered</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {venueData.services.map((service, index) => (
                    <span 
                      key={index}
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium text-center"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:w-96">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              {/* Pricing Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Pricing</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    venueData.type === 'Veg' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {venueData.type}
                  </span>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Starting Price</div>
                    <div className="text-3xl font-bold text-orange-800 mb-1">₹{venueData.startingPrice}</div>
                    <div className="text-sm text-gray-600">per plate</div>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-gray-500 text-center">
                  *Final price may vary based on menu selection and guest count
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">Get Quote</h4>
                
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />

                <div className="flex space-x-2">
                  <select
                    className="px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />

                <input
                  type="date"
                  name="weddingDate"
                  placeholder="Wedding Date"
                  value={formData.weddingDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    name="guests1"
                    placeholder="No. of Guests"
                    value={formData.guests1}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="number"
                    name="guests2"
                    placeholder="No. of Guests"
                    value={formData.guests2}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={handleSubmitEnquiry}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    <Send size={16} className="mr-2" />
                    Send Message
                  </button>
                  <button 
                    className="px-6 py-3 border-2 border-orange-500 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 flex items-center justify-center"
                  >
                    <Phone size={16} />
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

export default FoodVenueDetail;