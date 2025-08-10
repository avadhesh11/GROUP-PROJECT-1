import React, { useState, useEffect } from 'react';
import { Heart, Star, Share2, Image, MapPin, Users, Bed, Calendar, Mail, Phone, Send, MessageCircle } from 'lucide-react';

// Sample image for demonstration
const block_image = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

function VenueDetail() {
  const [phoneCode, setPhoneCode] = useState('+91');
  const [isShortlisted, setIsShortlisted] = useState(false);

  const details = {
    VenueName: 'The Royal Palace',
    address: '123 Celebration Street, Jaipur',
    VegPrice: '₹899 per plate',
    NonVegPrice: '₹1,040 per plate',
    destinationPrice: '20.00 Lakhs',
    room: '30',
    photoCount: '150',
    rating: '4.8',
    reviews: '247'
  };

  const handleClick = (action) => {
    alert(`${action} clicked!`);
  };

  const handleShortlist = () => {
    setIsShortlisted(!isShortlisted);
  };

  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+971', country: 'UAE' },
    { code: '+61', country: 'Australia'},
    { code: '+81', country: 'Japan'},
    { code: '+49', country: 'Germany'},
    { code: '+92', country: 'Pakistan' }
  ];

  const ImageBlock = ({
    image, VenueName, address,
    VegPrice, NonVegPrice,
    destinationPrice, room, photoCount, rating, reviews
  }) => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        {/* Image and Toolbar Section */}
        <div className="lg:col-span-2">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img 
              src={image} 
              alt={VenueName}
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            
            {/* Venue Info Overlay */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 line-clamp-2">{VenueName}</h1>
              <div className="flex items-center space-x-2 sm:space-x-4 text-sm sm:text-base lg:text-lg">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1 flex-shrink-0" />
                  <span className="truncate">{address}</span>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                  <Star size={14} className="text-yellow-400 fill-current mr-1" />
                  <span className="font-semibold text-sm">{rating}</span>
                  <span className="ml-1 text-xs">({reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Rating Badge */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <div className="bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full">
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-800 text-sm">{rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Toolbar */}
          <div className="mt-4 lg:mt-6 bg-white rounded-2xl shadow-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-6 overflow-x-auto">
                <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group flex-shrink-0">
                  <Image size={16} className="text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-blue-700 font-medium text-sm sm:text-base">{photoCount} Photos</span>
                </button>
                
                <div className="h-6 sm:h-8 w-px bg-gray-200 flex-shrink-0"></div>
                
                <button 
                  onClick={handleShortlist}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl transition-all group flex-shrink-0 ${
                    isShortlisted 
                      ? 'bg-red-50 hover:bg-red-100' 
                      : 'bg-gray-50 hover:bg-red-50'
                  }`}
                >
                  <Heart 
                    size={16} 
                    className={`transition-all group-hover:scale-110 ${
                      isShortlisted 
                        ? 'text-red-600 fill-current' 
                        : 'text-gray-600 group-hover:text-red-600'
                    }`} 
                  />
                  <span className={`font-medium text-sm sm:text-base ${
                    isShortlisted ? 'text-red-700' : 'text-gray-700'
                  }`}>
                    {isShortlisted ? 'Shortlisted' : 'Shortlist'}
                  </span>
                </button>
                
                <div className="h-6 sm:h-8 w-px bg-gray-200 flex-shrink-0 hidden sm:block"></div>
                
                <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-yellow-50 rounded-xl transition-colors group flex-shrink-0 hidden sm:flex">
                  <Star size={16} className="text-gray-600 group-hover:text-yellow-600 group-hover:scale-110 transition-all" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Review</span>
                </button>
                
                <div className="h-6 sm:h-8 w-px bg-gray-200 flex-shrink-0 hidden sm:block"></div>
                
                <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-50 hover:bg-green-50 rounded-xl transition-colors group flex-shrink-0 hidden sm:flex">
                  <Share2 size={16} className="text-gray-600 group-hover:text-green-600 group-hover:scale-110 transition-all" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Share</span>
                </button>
              </div>
            </div>
            
            {/* Mobile Additional Actions */}
            <div className="flex sm:hidden mt-3 space-x-3">
              <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-yellow-50 rounded-xl transition-colors group">
                <Star size={16} className="text-gray-600 group-hover:text-yellow-600 group-hover:scale-110 transition-all" />
                <span className="text-gray-700 font-medium text-sm">Review</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-green-50 rounded-xl transition-colors group">
                <Share2 size={16} className="text-gray-600 group-hover:text-green-600 group-hover:scale-110 transition-all" />
                <span className="text-gray-700 font-medium text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1 mt-6 lg:mt-0">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-8">
            {/* Pricing Section */}
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full mr-3"></span>
                Local Price
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                  <span className="text-green-700 font-semibold text-sm sm:text-base">🥗 Veg price</span>
                  <span className="text-base sm:text-lg font-bold text-green-800">{VegPrice}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                  <span className="text-red-700 font-semibold text-sm sm:text-base">🍖 Non Veg price</span>
                  <span className="text-base sm:text-lg font-bold text-red-800">{NonVegPrice}</span>
                </div>
              </div>
            </div>

            {/* Destination Price */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center">
                <Bed size={16} className="mr-2 text-blue-600 flex-shrink-0" />
                Destination Price
              </h4>
              <div className="text-sm text-gray-700">
                <div className="text-xl sm:text-2xl font-bold text-blue-800 mb-1">₹{destinationPrice}</div>
                <div className="text-sm">per day for <span className="font-semibold">{room} rooms</span></div>
                <div className="text-xs text-gray-600 mt-1">(incl. Rooms + 3 Meals + Venue)</div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 flex items-center">
                <MessageCircle size={16} className="mr-2 text-green-600 flex-shrink-0" />
                Get Quote
              </h4>
              
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Phone Input */}
              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-3 sm:space-y-0">
                <select
                  className="px-3 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all sm:min-w-0"
                  onChange={(e) => setPhoneCode(e.target.value)}
                  defaultValue={phoneCode}
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="flex-1 px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email and Date Grid */}
              <div className="grid grid-cols-1 gap-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
                <input
                  type="date"
                  className="px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Rooms and Guests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Bed size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Rooms"
                    className="w-full pl-10 pr-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <Users size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Guests"
                    className="w-full pl-10 pr-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                <button 
                  onClick={() => handleClick('Send Message')}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group text-sm sm:text-base"
                >
                  <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </button>
                <button 
                  onClick={() => handleClick('Contact')}
                  className="sm:px-6 py-3 px-4 border-2 border-pink-500 text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-all duration-300 flex items-center justify-center group text-sm sm:text-base"
                >
                  <Phone size={16} className="group-hover:scale-110 transition-transform sm:mr-0 mr-2" />
                  <span className="sm:hidden">Call Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ImageBlock
        image={block_image}
        photoCount={details.photoCount}
        VenueName={details.VenueName}
        address={details.address}
        VegPrice={details.VegPrice}
        NonVegPrice={details.NonVegPrice}
        destinationPrice={details.destinationPrice}
        room={details.room}
        rating={details.rating}
        reviews={details.reviews}
      />
    </div>
  );
}

export default VenueDetail;