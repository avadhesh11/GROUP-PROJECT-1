import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Heart, Star, Share2, Globe, Image, MapPin, Users, Bed, Calendar, Mail, Phone, Send, MessageCircle, ArrowLeft } from 'lucide-react';
import { useParams } from "react-router-dom";
function VenueDetail() {
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

const {id}=useParams();
const cleanid = id.replace(":", "");
console.log("id:",id);
console.log("cleanid:",cleanid);
  useEffect(() => {
    if (!cleanid) {
      setError('Venue ID not provided');
      setLoading(false);
      return;
    }

   axios.get(`http://localhost:5000/api/venues/${cleanid}`)
        .then(res => {
          console.log(res.data)
          setLoading(false);
          setVenueData(res.data)
        })
      .catch(err=>{
      setLoading(false);
      console.error("Error fetching venue details:", err)
      
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
      const response = await axios.post(`http://localhost:5000/api/venues/${venueData._id}/shortlist`, {}, {
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
    // Validate required fields
    if (!formData.fullName || !formData.phone || !formData.email || !formData.guests) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/enquiries', {
        venueId: venueData._id,
        venueName: venueData.title,
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
          rooms: '',
          guests: ''
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
        title: venueData.title,
        text: `Check out this amazing venue: ${venueData.title}`,
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


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading venue details...</p>
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
          <span className="font-medium">Back to Venues</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Section */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src={venueData.image || venueData.images?.[0]} 
                alt={venueData.title}
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Venue Info Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <div className="mb-3">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {venueData.type}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{venueData.title}</h1>
                <div className="flex items-center space-x-4 text-lg mb-3">
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2" />
                    <span className="text-gray-200">{venueData.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star size={16} className="text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{venueData.rating}</span>
                    <span className="ml-1 text-sm">({venueData.review} reviews)</span>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Users size={16} className="mr-1" />
                    <span className="text-sm">{venueData.capacity} guests</span>
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

            {/* Photo Toolbar */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
                    <Image size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="text-blue-700 font-medium">{venueData.more} Photos</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200"></div>
                  
                  <button 
                    onClick={() => {
                      const address = encodeURIComponent(venueData.location);
                      window.open(`https://www.google.com/maps/search/${address}`, '_blank');
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
                  >
                    <MapPin size={18} className="text-green-600 group-hover:scale-110 transition-transform" />
                    <span className="text-green-700 font-medium">View on Map</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-yellow-50 rounded-xl transition-colors group">
                    <Star size={18} className="text-gray-600 group-hover:text-yellow-600 group-hover:scale-110 transition-all" />
                    <span className="text-gray-700 font-medium">Write Review</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Venue Details</h3>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Users size={24} className="mx-auto text-blue-500 mb-2" />
                  <div className="font-bold text-blue-700">{venueData.capacity}</div>
                  <div className="text-sm text-gray-600">Max Guests</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Bed size={24} className="mx-auto text-purple-500 mb-2" />
                  <div className="font-bold text-purple-700">{venueData.room}</div>
                  <div className="text-sm text-gray-600">Rooms</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <Star size={24} className="mx-auto text-yellow-500 mb-2" />
                  <div className="font-bold text-yellow-700">{venueData.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Image size={24} className="mx-auto text-green-500 mb-2" />
                  <div className="font-bold text-green-700">{venueData.more || '50'}+</div>
                  <div className="text-sm text-gray-600">Photos</div>
                </div>
              </div>

              {/* Amenities */}
              {venueData.amenities && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {venueData.amenities.map((amenity, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {venueData.description && (
              <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About This Venue</h3>
                <p className="text-gray-700 leading-relaxed">{venueData.description}</p>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Pricing Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full mr-3"></span>
                  Pricing
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-green-700 font-semibold">Vegetarian</span>
                    </div>
                    <span className="text-lg font-bold text-green-800">₹{venueData.vegprice}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                      <span className="text-orange-700 font-semibold">Non-Veg</span>
                    </div>
                    <span className="text-lg font-bold text-orange-800">₹{venueData.nonvegprice}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center">per plate</div>
              </div>

              {/* Destination Price */}
              {venueData.destinationPrice && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                    <Bed size={18} className="mr-2 text-blue-600" />
                    Destination Package
                  </h4>
                  <div className="text-sm text-gray-700">
                    <div className="text-2xl font-bold text-blue-800 mb-1">₹{(venueData.destinationPrice / 100000).toFixed(1)} Lakhs</div>
                    <div>per day for <span className="font-semibold">{venueData.room} rooms</span></div>
                    <div className="text-xs text-gray-600 mt-1">(incl. Rooms + 3 Meals + Venue)</div>
                  </div>
                </div>
              )}

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
                        onChange={(e) => setPhoneCode(e.target.value)}>
                  {countryCodes.map((country) => (
                     <option key={country.code} value={country.code} className="flex items-center space-x-2">
                     <Globe size={16} className="inline mr-1" />
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