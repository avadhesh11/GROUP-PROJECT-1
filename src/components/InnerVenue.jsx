import React, { useState, useEffect } from 'react';
import { Heart, Star, Share2, Image, MapPin, Users, Bed, Calendar, Mail, Phone, Send, MessageCircle } from 'lucide-react';

function VenueDetail({ venueId = '1' }) {
  const [phoneCode, setPhoneCode] = useState('+91');
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [venueData, setVenueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventDate: '',
    rooms: '',
    guests: ''
  });

  // Demo venue data
  const demoVenueData = {
    _id: '1',
    name: 'The Royal Palace',
    address: '123 Celebration Street, Jaipur, Rajasthan',
    vegPrice: 899,
    nonVegPrice: 1040,
    destinationPrice: 2000000,
    rooms: 30,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
   images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    photoCount: 150,
    rating: 4.8,
    reviewCount: 247,
    capacity: 500,
    amenities: ['AC', 'Parking', 'Catering', 'Decoration', 'DJ', 'Photography'],
    description: 'Experience the grandeur of The Royal Palace, where dreams come to life in an atmosphere of elegance and sophistication.'
  };

  // Fetch venue data
  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        const response = await fetch(`http://localhost:5000/api/venues/${venueId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch venue data');
        }
        const data = await response.json();
        setVenueData(data);
      } catch (err) {
        console.error('Error fetching venue data:', err);
        setError(err.message);
        // Use demo data as fallback
        setVenueData(demoVenueData);
      } finally {
        setLoading(false);
      }
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

  const handleShortlist = async () => {
    try {
      // Simulate API call for shortlisting
      const response = await fetch(`http://localhost:5000/api/user/shortlist/${venueData._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        setIsShortlisted(!isShortlisted);
      }
    } catch (err) {
      console.error('Error updating shortlist:', err);
      // For demo, just toggle the state
      setIsShortlisted(!isShortlisted);
    }
  };

  const handleSubmitEnquiry = async () => {
    // Validate required fields
    if (!formData.fullName || !formData.phone || !formData.email || !formData.guests) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          venueId: venueData._id,
          ...formData,
          phoneCode
        })
      });

      if (response.ok) {
        alert('Enquiry submitted successfully!');
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          eventDate: '',
          rooms: '',
          guests: ''
        });
      } else {
        throw new Error('Failed to submit enquiry');
      }
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      alert('Failed to submit enquiry. Please try again.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: venueData.name,
        text: `Check out this amazing venue: ${venueData.name}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const countryCodes = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+92', country: 'Pakistan', flag: '🇵🇰' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading venue details...</p>
        </div>
      </div>
    );
  }

  if (error && !venueData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">Error loading venue details</p>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image and Toolbar Section */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src={venueData.image || venueData.images?.[0]} 
                alt={venueData.name}
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Venue Info Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{venueData.name}</h1>
                <div className="flex items-center space-x-4 text-lg mb-2">
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2" />
                    <span>{venueData.address}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star size={16} className="text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{venueData.rating}</span>
                    <span className="ml-1 text-sm">({venueData.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="absolute top-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="font-bold text-gray-800">{venueData.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Toolbar */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
                    <Image size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="text-blue-700 font-medium">{venueData.photoCount} Photos</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200"></div>
                  
                  <button 
                    onClick={handleShortlist}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all group ${
                      isShortlisted 
                        ? 'bg-red-50 hover:bg-red-100' 
                        : 'bg-gray-50 hover:bg-red-50'
                    }`}
                  >
                    <Heart 
                      size={18} 
                      className={`transition-all group-hover:scale-110 ${
                        isShortlisted 
                          ? 'text-red-600 fill-current' 
                          : 'text-gray-600 group-hover:text-red-600'
                      }`} 
                    />
                    <span className={`font-medium ${
                      isShortlisted ? 'text-red-700' : 'text-gray-700'
                    }`}>
                      {isShortlisted ? 'Shortlisted' : 'Shortlist'}
                    </span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-yellow-50 rounded-xl transition-colors group">
                    <Star size={18} className="text-gray-600 group-hover:text-yellow-600 group-hover:scale-110 transition-all" />
                    <span className="text-gray-700 font-medium">Review</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200"></div>
                  
                  <button 
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-green-50 rounded-xl transition-colors group"
                  >
                    <Share2 size={18} className="text-gray-600 group-hover:text-green-600 group-hover:scale-110 transition-all" />
                    <span className="text-gray-700 font-medium">Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Venue Description */}
            {venueData.description && (
              <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">About This Venue</h3>
                <p className="text-gray-700 leading-relaxed">{venueData.description}</p>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              {/* Pricing Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full mr-3"></span>
                  Local Price
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                    <span className="text-green-700 font-semibold">🥗 Veg price</span>
                    <span className="text-lg font-bold text-green-800">₹{venueData.vegPrice}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                    <span className="text-red-700 font-semibold">🍖 Non Veg price</span>
                    <span className="text-lg font-bold text-red-800">₹{venueData.nonVegPrice}</span>
                  </div>
                </div>
              </div>

              {/* Destination Price */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                  <Bed size={18} className="mr-2 text-blue-600" />
                  Destination Price
                </h4>
                <div className="text-sm text-gray-700">
                  <div className="text-2xl font-bold text-blue-800 mb-1">₹{(venueData.destinationPrice / 100000).toFixed(1)} Lakhs</div>
                  <div>per day for <span className="font-semibold">{venueData.rooms} rooms</span></div>
                  <div className="text-xs text-gray-600 mt-1">(incl. Rooms + 3 Meals + Venue)</div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 flex items-center">
                  <MessageCircle size={18} className="mr-2 text-green-600" />
                  Get Quote
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
                        {country.flag} {country.code}
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
                  <div className="relative">
                    <Bed size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="rooms"
                      placeholder="Rooms"
                      value={formData.rooms}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Users size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="guests"
                      placeholder="Guests *"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={handleSubmitEnquiry}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group"
                  >
                    <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </button>
                  <button 
                    onClick={() => window.open(`tel:${phoneCode}1234567890`)}
                    className="px-6 py-3 border-2 border-pink-500 text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center justify-center group"
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

export default VenueDetail;