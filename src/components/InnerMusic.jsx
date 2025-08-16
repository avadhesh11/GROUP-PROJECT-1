import React, { useState, useEffect } from 'react';
import { Heart, Star, Share2, Globe, Play, MapPin, Users, Clock, Calendar, Phone, Send, MessageCircle, ArrowLeft, Music, Award, Camera, Mic2, Volume2, PartyPopper, Trophy, CheckCircle } from 'lucide-react';

// Mock Navbar component for demonstration
const Navbar = () => (
  <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            EventVenue
          </div>
        </div>
      </div>
    </div>
  </nav>
);

function MusicPerformerDetail({ performerId }) {
  const [phoneCode, setPhoneCode] = useState('+91');
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [performerData, setPerformerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventDate: '',
    duration: '',
    eventType: '',
    guests: '',
    specialRequests: ''
  });

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPerformerData({
        _id: "performer_123",
        title: "Rajasthani Folk Dance Troupe",
        artistName: "Meera Dance Academy",
        type: "Traditional Dance",
        location: "Jaipur, Rajasthan",
        rating: 4.9,
        review: 156,
        price: 85000,
        experience: "12+ years",
        teamSize: "15 members",
        duration: "3-4 hours",
        speciality: "Rajasthani Folk & Classical",
        image: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        images: [
          "https://images.unsplash.com/photo-1524863479829-916d8e77f114?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ],
        videos: 8,
        photos: 45,
        events: 180,
        description: "Experience the vibrant culture of Rajasthan through our authentic folk dance performances. Our academy brings together seasoned artists who have mastered the traditional dance forms like Ghoomar, Kalbeliya, and Bhavai. Each performance is a celebration of Rajasthani heritage with colorful costumes, traditional music, and captivating choreography.",
        services: [
          "Traditional Rajasthani Folk Dance",
          "Classical Dance Forms",
          "Live Music Accompaniment",
          "Traditional Costumes & Props",
          "Cultural Storytelling",
          "Interactive Audience Participation"
        ],
        achievements: [
          "National Folk Dance Award 2022",
          "Cultural Heritage Ambassador",
          "Featured in 50+ Destination Weddings",
          "International Performance Tours"
        ],
        packages: [
          {
            name: "Cultural Evening",
            duration: "2 hours",
            price: 45000,
            includes: ["3 Dance Performances", "Traditional Music", "Basic Costumes"]
          },
          {
            name: "Grand Celebration",
            duration: "4 hours",
            price: 85000,
            includes: ["6+ Dance Performances", "Live Musicians", "Premium Costumes", "Audience Interaction"]
          },
          {
            name: "Multi-Day Festival",
            duration: "3 days",
            price: 200000,
            includes: ["Multiple Performances Daily", "Workshops", "Cultural Activities", "Full Setup"]
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [performerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShortlist = () => {
    setIsShortlisted(!isShortlisted);
    // In real app, make API call here
  };

  const handleSubmitEnquiry = () => {
    if (!formData.fullName || !formData.phone || !formData.email || !formData.eventType) {
      alert('Please fill in all required fields');
      return;
    }

    alert('Booking enquiry submitted successfully!');
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      eventDate: '',
      duration: '',
      eventType: '',
      guests: '',
      specialRequests: ''
    });
  };

  const handleShare = () => {
    if (navigator.share && performerData) {
      navigator.share({
        title: performerData.title,
        text: `Check out this amazing performer: ${performerData.title}`,
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading performer details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !performerData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-2">Error loading performer details</p>
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
          <span className="font-medium">Back to Performers</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Section */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src={performerData.image} 
                alt={performerData.title}
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              {/* Video Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/90 backdrop-blur-sm p-6 rounded-full shadow-xl hover:bg-white transition-colors group">
                  <Play size={32} className="text-purple-600 ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              
              {/* Performer Info Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <div className="mb-3">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {performerData.type}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{performerData.title}</h1>
                <p className="text-lg text-gray-200 mb-3">{performerData.artistName}</p>
                <div className="flex items-center space-x-4 text-lg mb-3">
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2" />
                    <span className="text-gray-200">{performerData.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Star size={16} className="text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{performerData.rating}</span>
                    <span className="ml-1 text-sm">({performerData.review} reviews)</span>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Award size={16} className="mr-1" />
                    <span className="text-sm">{performerData.experience}</span>
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

            {/* Media Toolbar */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 rounded-xl transition-colors group">
                    <Play size={18} className="text-red-600 group-hover:scale-110 transition-transform" />
                    <span className="text-red-700 font-medium">{performerData.videos} Videos</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
                    <Camera size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="text-blue-700 font-medium">{performerData.photos} Photos</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
                    <PartyPopper size={18} className="text-green-600 group-hover:scale-110 transition-transform" />
                    <span className="text-green-700 font-medium">{performerData.events} Events</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-yellow-50 rounded-xl transition-colors group">
                    <Star size={18} className="text-gray-600 group-hover:text-yellow-600 group-hover:scale-110 transition-all" />
                    <span className="text-gray-700 font-medium">Write Review</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: Music },
                    { id: 'packages', label: 'Packages', icon: Trophy },
                    { id: 'achievements', label: 'Achievements', icon: Award }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                        activeTab === id
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Performance Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <Users size={24} className="mx-auto text-purple-500 mb-2" />
                        <div className="font-bold text-purple-700">{performerData.teamSize}</div>
                        <div className="text-sm text-gray-600">Team Size</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <Clock size={24} className="mx-auto text-blue-500 mb-2" />
                        <div className="font-bold text-blue-700">{performerData.duration}</div>
                        <div className="text-sm text-gray-600">Duration</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-xl">
                        <Star size={24} className="mx-auto text-yellow-500 mb-2" />
                        <div className="font-bold text-yellow-700">{performerData.rating}</div>
                        <div className="text-sm text-gray-600">Rating</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-xl">
                        <PartyPopper size={24} className="mx-auto text-green-500 mb-2" />
                        <div className="font-bold text-green-700">{performerData.events}+</div>
                        <div className="text-sm text-gray-600">Events</div>
                      </div>
                    </div>

                    {/* About Section */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">About the Performance</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">{performerData.description}</p>
                    </div>

                    {/* Services */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">What's Included</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {performerData.services.map((service, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                            <span className="text-green-800 font-medium">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'packages' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Packages</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {performerData.packages.map((pkg, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                          <div className="text-center mb-4">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{pkg.name}</h4>
                            <div className="text-sm text-gray-600 mb-2">{pkg.duration}</div>
                            <div className="text-2xl font-bold text-purple-600">₹{pkg.price.toLocaleString()}</div>
                          </div>
                          <div className="space-y-2">
                            {pkg.includes.map((item, i) => (
                              <div key={i} className="flex items-center space-x-2 text-sm">
                                <CheckCircle size={14} className="text-green-500" />
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'achievements' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Awards & Recognition</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {performerData.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                          <Trophy size={20} className="text-yellow-600 flex-shrink-0" />
                          <span className="font-medium text-gray-900">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Pricing Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></span>
                  Starting Price
                </h3>
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">₹{performerData.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">per performance</div>
                  <div className="text-xs text-purple-600 font-medium mt-1">{performerData.speciality}</div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 flex items-center">
                  <MessageCircle size={18} className="mr-2 text-purple-600" />
                  Book Performance
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

                <div className="grid grid-cols-2 gap-3">
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">Duration</option>
                    <option value="2-hours">2 hours</option>
                    <option value="4-hours">4 hours</option>
                    <option value="full-day">Full day</option>
                  </select>
                  
                  <input
                    type="number"
                    name="guests"
                    placeholder="Expected Guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Event Type *</option>
                  <option value="wedding">Wedding</option>
                  <option value="reception">Reception</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="cultural">Cultural Program</option>
                  <option value="other">Other</option>
                </select>

                <textarea
                  name="specialRequests"
                  placeholder="Special Requirements (Optional)"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                />

                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={handleSubmitEnquiry}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center group"
                  >
                    <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
                    Book Now
                  </button>
                  <button 
                    onClick={() => window.open(`tel:${phoneCode}1234567890`)}
                    className="px-6 py-3 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center group"
                  >
                    <Phone size={16} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Quick Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h5 className="font-semibold text-gray-900 mb-2">Quick Info</h5>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Response Time:</span>
                      <span className="font-medium">Within 2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Advance Booking:</span>
                      <span className="font-medium">30 days required</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Travel:</span>
                      <span className="font-medium">Pan India</span>
                    </div>
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

export default MusicPerformerDetail;