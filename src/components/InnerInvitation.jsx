import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Heart, Star, Share2, Image, MapPin, Users, Calendar, Mail, Phone, Send, MessageCircle, ArrowLeft, Palette, Clock, Award, Download, Eye, Sparkles, Printer, FileText, Zap, CheckCircle } from 'lucide-react';

function InvitationDetail({ invitationId }) {
  const [phoneCode, setPhoneCode] = useState('+91');
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [invitationData, setInvitationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventDate: '',
    eventType: 'wedding',
    quantity: '100',
    customizationLevel: 'basic',
    specialRequests: ''
  });

  useEffect(() => {
    if (!invitationId) {
      setError('Invitation ID not provided');
      setLoading(false);
      return;
    }
    
    axios.get(`http://localhost:5000/api/invitation/${invitationId}`)
      .then((response) => {
        console.log('Invitation details fetched:', response.data);
        setInvitationData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching invitation details:", error);
        setError('Failed to load invitation details');
        setLoading(false);
      });
  }, [invitationId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShortlist = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/invitation/${invitationData._id}/shortlist`, {}, {
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
    if (!formData.fullName || !formData.phone || !formData.email || !formData.quantity) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/invitation-enquiries', {
        invitationId: invitationData._id,
        designerName: invitationData.designer,
        invitationTitle: invitationData.title,
        selectedPackage,
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
          eventType: 'wedding',
          quantity: '100',
          customizationLevel: 'basic',
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
        title: invitationData.title,
        text: `Check out this beautiful wedding invitation design: ${invitationData.title}`,
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

  const packages = {
    basic: {
      name: 'Basic Digital',
      price: invitationData?.price || 1500,
      features: ['Digital invitation only', 'Basic customization', '2 design revisions', 'Standard delivery'],
      delivery: '12 hours'
    },
    premium: {
      name: 'Premium Digital + Print',
      price: (invitationData?.price || 1500) + 1000,
      features: ['Digital + Print ready files', 'Advanced customization', '5 design revisions', 'Priority support'],
      delivery: '24 hours'
    },
    luxury: {
      name: 'Luxury Complete Suite',
      price: (invitationData?.price || 1500) + 2500,
      features: ['Complete wedding suite', 'Unlimited revisions', 'Video invitation', 'Personal designer'],
      delivery: '48 hours'
    }
  };

  const sampleDesigns = [
    { type: 'Main Invitation', preview: invitationData?.image },
    { type: 'Save the Date', preview: '/api/placeholder/400/500' },
    { type: 'RSVP Card', preview: '/api/placeholder/400/500' },
    { type: 'Menu Card', preview: '/api/placeholder/400/500' },
    { type: 'Thank You Card', preview: '/api/placeholder/400/500' },
    { type: 'Program Card', preview: '/api/placeholder/400/500' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading invitation details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !invitationData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-2">Error loading invitation details</p>
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
          <span className="font-medium">Back to Invitations</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Section */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src={invitationData.image || '/api/placeholder/800/600'} 
                alt={invitationData.title}
                className="w-full h-96 lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Invitation Info Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <div className="mb-3">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {invitationData.category} Design
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{invitationData.title}</h1>
                <div className="flex items-center space-x-4 text-lg mb-3">
                  <div className="flex items-center">
                    <Palette size={18} className="mr-2" />
                    <span className="text-gray-200">by {invitationData.designer}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star size={16} className="text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{invitationData.rating}</span>
                    <span className="ml-1 text-sm">({invitationData.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Sparkles size={16} className="mr-1" />
                    <span className="text-sm">Premium Quality</span>
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
                    <Download size={18} className="text-green-600 group-hover:scale-110 transition-transform" />
                    <span className="text-green-700 font-medium">Sample Download</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-yellow-50 rounded-xl transition-colors group">
                    <Star size={18} className="text-gray-600 group-hover:text-yellow-600 group-hover:scale-110 transition-all" />
                    <span className="text-gray-700 font-medium">Write Review</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Design Details Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Design Details</h3>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <FileText size={24} className="mx-auto text-pink-500 mb-2" />
                  <div className="font-bold text-pink-700">₹{invitationData.price}</div>
                  <div className="text-sm text-gray-600">Starting Price</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Palette size={24} className="mx-auto text-purple-500 mb-2" />
                  <div className="font-bold text-purple-700">{invitationData.designs}</div>
                  <div className="text-sm text-gray-600">Variations</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <Clock size={24} className="mx-auto text-yellow-500 mb-2" />
                  <div className="font-bold text-yellow-700">{invitationData.deliveryTime}</div>
                  <div className="text-sm text-gray-600">Delivery</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <CheckCircle size={24} className="mx-auto text-green-500 mb-2" />
                  <div className="font-bold text-green-700">{invitationData.format}</div>
                  <div className="text-sm text-gray-600">Format</div>
                </div>
              </div>

              {/* Design Features */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Design Features</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'High Resolution Graphics',
                    'Print Ready Files',
                    'Multiple Formats',
                    'Color Variations',
                    'Font Customization',
                    'Layout Flexibility',
                    'Premium Typography',
                    'Professional Design',
                    'Quick Turnaround'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sample Designs Gallery */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Suite Preview</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {sampleDesigns.map((design, index) => (
                  <div key={index} className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <img 
                      src={design.preview || '/api/placeholder/300/400'} 
                      alt={design.type}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="font-semibold mb-1">{design.type}</h4>
                      <button className="flex items-center text-sm bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full hover:bg-white/30 transition-colors">
                        <Eye size={14} className="mr-1" />
                        Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">*Complete wedding suite includes all shown designs</p>
              </div>
            </div>

            {/* About Designer Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About the Designer</h3>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {invitationData.designer?.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{invitationData.designer}</h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Professional wedding invitation designer specializing in {invitationData.category.toLowerCase()} styles. 
                    With years of experience creating beautiful, memorable invitations that perfectly capture the essence 
                    of your special day. Every design is crafted with attention to detail and personalized touches.
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Award size={16} className="mr-1 text-gold-500" />
                      <span>Premium Designer</span>
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-1 text-blue-500" />
                      <span>500+ Happy Clients</span>
                    </div>
                    <div className="flex items-center">
                      <Star size={16} className="mr-1 text-yellow-500 fill-current" />
                      <span>{invitationData.rating} Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Package Selection */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full mr-3"></span>
                  Choose Package
                </h3>
                
                <div className="space-y-3">
                  {Object.entries(packages).map(([key, pkg]) => (
                    <div 
                      key={key}
                      onClick={() => setSelectedPackage(key)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedPackage === key 
                          ? 'border-pink-500 bg-pink-50' 
                          : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-semibold ${selectedPackage === key ? 'text-pink-700' : 'text-gray-900'}`}>
                          {pkg.name}
                        </h4>
                        <span className={`text-xl font-bold ${selectedPackage === key ? 'text-pink-800' : 'text-gray-800'}`}>
                          ₹{pkg.price.toLocaleString()}
                        </span>
                      </div>
                      <ul className="space-y-1 mb-2">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle size={12} className="text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={12} className="mr-1" />
                        <span>Delivery in {pkg.delivery}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 flex items-center">
                  <MessageCircle size={18} className="mr-2 text-pink-600" />
                  Get Custom Quote
                </h4>
                
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  required
                />

                <div className="flex space-x-2">
                  <select
                    className="px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
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
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  required
                />

                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />

                <div className="grid grid-cols-2 gap-3">
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  >
                    <option value="wedding">Wedding</option>
                    <option value="engagement">Engagement</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="reception">Reception</option>
                  </select>
                  
                  <div className="relative">
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Quantity *"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <select
                  name="customizationLevel"
                  value={formData.customizationLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                >
                  <option value="basic">Basic Customization</option>
                  <option value="moderate">Moderate Changes</option>
                  <option value="extensive">Extensive Customization</option>
                  <option value="complete">Complete Custom Design</option>
                </select>

                <textarea
                  name="specialRequests"
                  placeholder="Special requests, color preferences, text details..."
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all h-20 resize-none"
                />

                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={handleSubmitEnquiry}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group"
                  >
                    <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
                    Get Quote
                  </button>
                  <button 
                    onClick={() => window.open(`tel:${phoneCode}1234567890`)}
                    className="px-6 py-3 border-2 border-pink-500 text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center justify-center group"
                  >
                    <Phone size={16} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center space-x-2 py-2 px-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                      <Download size={14} className="text-blue-600" />
                      <span className="text-sm text-blue-700">Sample</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 py-2 px-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                      <Eye size={14} className="text-green-600" />
                      <span className="text-sm text-green-700">Preview</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitationDetail;