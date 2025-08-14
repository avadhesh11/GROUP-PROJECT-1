import React, { useState } from 'react';
import { Heart, Star, Share2, Image, MapPin, Music, Phone, Mail, Calendar, Users, Send, MessageCircle, Volume2, Mic, Headphones, Radio } from 'lucide-react';

function MusicServiceDetail() {
  const [phoneCode, setPhoneCode] = useState('+91');
  const [isShortlisted, setIsShortlisted] = useState(false);

  const details = {
    VenueName: 'Harmony Music Productions',
    address: '123 Celebration Street, Jaipur',
    StartingPrice: '₹5,00,000',
    photoCount: '150',
    rating: '4.9',
    reviews: '324'
  };

  const handleClick = (action) => {
    alert(`${action} clicked!`);
  };

  const handleShortlist = () => {
    setIsShortlisted(!isShortlisted);
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

  const musicServices = [
    { icon: <Mic className="w-5 h-5" />, name: 'Live Band', description: 'Professional musicians' },
    { icon: <Volume2 className="w-5 h-5" />, name: 'Sound System', description: 'High-quality audio setup' },
    { icon: <Headphones className="w-5 h-5" />, name: 'DJ Services', description: 'Professional DJ mixing' },
    { icon: <Radio className="w-5 h-5" />, name: 'Music Production', description: 'Custom compositions' }
  ];

  const ImageBlock = ({
    image, VenueName, address,
    StartingPrice, photoCount, rating, reviews
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
            
            {/* Music Service Info Overlay */}
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
                <div className="flex items-center bg-purple-500/30 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full ml-2">
                  <Music size={14} className="text-purple-200 mr-1" />
                  <span className="font-semibold text-sm text-purple-200">Music Service</span>
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

            {/* Music Icon Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <div className="bg-purple-500/90 backdrop-blur-sm p-2 sm:p-3 rounded-full">
                <Music size={16} className="text-white" />
              </div>
            </div>
          </div>

          {/* Photo Toolbar */}
          <div className="mt-4 lg:mt-6 bg-white rounded-2xl shadow-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-6 overflow-x-auto">
                <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group flex-shrink-0">
                  <Image size={16} className="text-purple-600 group-hover:scale-110 transition-transform" />
                  <span className="text-purple-700 font-medium text-sm sm:text-base">{photoCount} Photos</span>
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

          {/* Music Services Grid */}
          <div className="mt-4 lg:mt-6 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></span>
              Our Music Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {musicServices.map((service, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 hover:bg-purple-50 rounded-xl transition-colors group">
                  <div className="text-purple-600 group-hover:text-purple-700 mr-3">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{service.name}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1 mt-6 lg:mt-0">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-8">
            {/* Pricing Section */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center">
                <Music size={16} className="mr-2 text-purple-600 flex-shrink-0" />
                Starting Price
              </h4>
              <div className="text-2xl sm:text-3xl font-bold text-purple-800 mb-1">{StartingPrice}</div>
              <div className="text-sm text-gray-600">for complete music setup</div>
              <div className="text-xs text-gray-500 mt-1">(includes equipment & performance)</div>
            </div>

            {/* Contact Form */}
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 flex items-center">
                <MessageCircle size={16} className="mr-2 text-purple-600 flex-shrink-0" />
                Get Music Quote
              </h4>
              
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Phone Input */}
              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-3 sm:space-y-0">
                <select
                  className="px-3 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all sm:min-w-0"
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
                  className="flex-1 px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email and Date Grid */}
              <div className="grid grid-cols-1 gap-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                <input
                  type="date"
                  className="px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Music size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none">
                    <option value="">Event Type</option>
                    <option value="wedding">Wedding</option>
                    <option value="reception">Reception</option>
                    <option value="engagement">Engagement</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>
                <div className="relative">
                  <Users size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Expected Guests"
                    className="w-full pl-10 pr-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Additional Requirements */}
              <div>
                <textarea
                  placeholder="Special requirements or music preferences..."
                  rows="3"
                  className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                <button 
                  onClick={() => handleClick('Send Message')}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group text-sm sm:text-base"
                >
                  <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Get Quote
                </button>
                <button 
                  onClick={() => handleClick('Contact')}
                  className="sm:px-6 py-3 px-4 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center group text-sm sm:text-base"
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

  // Mock music service image
  const mockImage = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mock Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Music Services</h1>
        </div>
      </nav>
      
      <ImageBlock
        image={mockImage}
        photoCount={details.photoCount}
        VenueName={details.VenueName}
        address={details.address}
        StartingPrice={details.StartingPrice}
        rating={details.rating}
        reviews={details.reviews}
      />
    </div>
  );
}

export default MusicServiceDetail;