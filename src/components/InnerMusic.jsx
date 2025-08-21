import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import { Heart, Star, Share2, Globe, Image, MapPin, Users, Calendar, Mail, Phone, Send, MessageCircle, ArrowLeft, Play, Volume2, Clock, Award, Music } from 'lucide-react';
import { useParams } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_API_URL;
function MusicInnerPage() {
  const [phoneCode, setPhoneCode] = useState('+91');
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [performerData, setPerformerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventDate: '',
    eventType: '',
    duration: '',
    guests: ''
  });

  const { id } = useParams();
  const cleanid = id.replace(":", "");
  
  console.log("id:", id);
  console.log("cleanid:", cleanid);

  useEffect(() => {
    if (!cleanid) {
      setError('Performer ID not provided');
      setLoading(false);
      return;
    }
    
    axios.get(`${BACKEND_URL}/api/music/${cleanid}`)
      .then(res => {
        console.log(res.data)
        setLoading(false);
        setPerformerData(res.data)
      })
      .catch(err => {
        setLoading(false);
        console.error("Error fetching performer details:", err)
        setError('Failed to load performer details');
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
      const response = await axios.post(`${BACKEND_URL}/api/music/${performerData._id}/shortlist`, {}, {
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
      const response = await axios.post(`${BACKEND_URL}/api/music-enquiries`, {
        performerId: performerData._id,
        performerName: performerData.title,
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
          eventType: '',
          duration: '',
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading performer details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !performerData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 text-lg mb-2">Error loading performer details</p>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg transition-colors"
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
          <span className="font-medium">Back to Performers</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Section */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl dark:shadow-gray-900/50 group">
              <img 
                src={performerData.image || performerData.images?.[0]} 
                alt={performerData.title}
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Performer Info Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <div className="mb-3">
                  <span className="bg-white/10 dark:bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {performerData.speciality || performerData.genre}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{performerData.title}</h1>
                <div className="flex items-center space-x-4 text-lg mb-3">
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2" />
                    <span className="text-gray-200">{performerData.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full">
                    <Star size={16} className="text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{performerData.rating}</span>
                    <span className="ml-1 text-sm">({performerData.review} reviews)</span>
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full">
                    <Users size={16} className="mr-1" />
                    <span className="text-sm">{performerData.teamSize || '1-5'} members</span>
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">{performerData.duration || '2-4 hrs'}</span>
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
                        : 'text-white hover:text-purple-400'
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

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/90 backdrop-blur-sm p-6 rounded-full shadow-lg hover:bg-white transition-colors">
                  <Play size={32} className="text-purple-600 ml-1" />
                </button>
              </div>
            </div>

            {/* Media Toolbar */}
            <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-4 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/50 hover:bg-purple-100 dark:hover:bg-purple-800/50 border border-purple-200 dark:border-purple-700/50 rounded-xl transition-colors group">
                    <Play size={18} className="text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="text-purple-700 dark:text-purple-300 font-medium">{performerData.videoCount || '10'} Videos</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200 dark:bg-gray-600"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-800/50 border border-blue-200 dark:border-blue-700/50 rounded-xl transition-colors group">
                    <Volume2 size={18} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-blue-700 dark:text-blue-300 font-medium">{performerData.audioSamples || '25'} Audio</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200 dark:bg-gray-600"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-900/50 hover:bg-green-100 dark:hover:bg-green-800/50 border border-green-200 dark:border-green-700/50 rounded-xl transition-colors group">
                    <Image size={18} className="text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" />
                    <span className="text-green-700 dark:text-green-300 font-medium">{performerData.photos || '50'} Photos</span>
                  </button>
                  
                  <div className="h-8 w-px bg-gray-200 dark:bg-gray-600"></div>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 dark:bg-gray-700/50 hover:bg-yellow-50 dark:hover:bg-yellow-900/50 border border-gray-200 dark:border-gray-600 hover:border-yellow-300 dark:hover:border-yellow-700/50 rounded-xl transition-colors group">
                    <Star size={18} className="text-gray-600 dark:text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 group-hover:scale-110 transition-all" />
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-yellow-700 dark:group-hover:text-yellow-300 font-medium">Write Review</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Performance Details Section */}
            <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 transition-colors duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Performance Details</h3>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/30 rounded-xl transition-colors duration-300">
                  <Users size={24} className="mx-auto text-purple-500 dark:text-purple-400 mb-2" />
                  <div className="font-bold text-purple-700 dark:text-purple-300">{performerData.teamSize || '1-5'}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Team Size</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/30 rounded-xl transition-colors duration-300">
                  <Clock size={24} className="mx-auto text-blue-500 dark:text-blue-400 mb-2" />
                  <div className="font-bold text-blue-700 dark:text-blue-300">{performerData.duration || '2-4 hrs'}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700/30 rounded-xl transition-colors duration-300">
                  <Award size={24} className="mx-auto text-yellow-500 dark:text-yellow-400 mb-2" />
                  <div className="font-bold text-yellow-700 dark:text-yellow-300">{performerData.experience || '5+ Years'}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Experience</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/30 rounded-xl transition-colors duration-300">
                  <Star size={24} className="mx-auto text-green-500 dark:text-green-400 mb-2" />
                  <div className="font-bold text-green-700 dark:text-green-300">{performerData.rating}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Performance Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {(performerData.skills || ['Live Singing', 'Stage Performance', 'Audience Interaction', 'Professional Setup']).map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 border border-purple-200 dark:border-purple-700/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Event Types */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Suitable Events</h4>
                <div className="flex flex-wrap gap-2">
                  {(performerData.eventTypes || ['Weddings', 'Corporate Events', 'Private Parties', 'Cultural Shows', 'Festivals']).map((eventType, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium transition-colors duration-300"
                    >
                      {eventType}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {(performerData.languages || ['Hindi', 'English', 'Punjabi', 'Regional']).map((language, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-700/50 text-green-700 dark:text-green-300 rounded-full text-sm font-medium transition-colors duration-300"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 transition-colors duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About the Performance</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {performerData.description || `Experience an unforgettable musical journey with ${performerData.title}. Our talented team brings years of professional experience in ${performerData.speciality || performerData.genre} music, creating memorable moments for your special events. We specialize in live performances that captivate audiences and create the perfect atmosphere for your celebration.`}
              </p>
            </div>

            {/* Awards Section */}
            {performerData.awards && performerData.awards.length > 0 && (
              <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 transition-colors duration-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Award size={20} className="mr-2 text-yellow-500 dark:text-yellow-400" />
                  Awards & Recognition
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {performerData.awards.map((award, index) => (
                    <div key={index} className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700/30 rounded-xl transition-colors duration-300">
                      <Award size={18} className="text-yellow-600 dark:text-yellow-400 mr-3" />
                      <span className="text-yellow-800 dark:text-yellow-300 font-medium">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 sticky top-24 transition-colors duration-300">
              {/* Pricing Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></span>
                  Performance Package
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700/30 rounded-xl transition-colors duration-300">
                    <div className="flex items-center">
                      <Music size={20} className="text-purple-600 dark:text-purple-400 mr-2" />
                      <span className="text-purple-700 dark:text-purple-300 font-semibold">Complete Show</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-800 dark:text-purple-200">₹{parseInt(performerData.price || 50000).toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Includes: Performance + Equipment + Travel (within city)
                </div>
              </div>

              {/* Package Features */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700/30 rounded-xl transition-colors duration-300">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                  <Music size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
                  What's Included
                </h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mr-2"></span>Professional Sound System</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mr-2"></span>Stage Setup & Lighting</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mr-2"></span>Costume & Makeup</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mr-2"></span>Travel Within City</li>
                </ul>
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <MessageCircle size={18} className="mr-2 text-green-600 dark:text-green-400" />
                  Book Performance
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

                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">Select Event Type</option>
                  <option value="wedding" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">Wedding</option>
                  <option value="corporate" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">Corporate Event</option>
                  <option value="private" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">Private Party</option>
                  <option value="festival" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">Festival</option>
                  <option value="cultural" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">Cultural Show</option>
                </select>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">Duration</option>
                      <option value="2-hours" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">2 hours</option>
                      <option value="4-hours" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">4 hours</option>
                      <option value="6-hours" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">6 hours</option>
                      <option value="full-day" className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white">Full Day</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Users size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      type="number"
                      name="guests"
                      placeholder="Guests *"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={handleSubmitEnquiry}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 dark:hover:from-purple-700 dark:hover:to-pink-800 transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-gray-900/50 flex items-center justify-center group"
                  >
                    <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
                    Book Now
                  </button>
                  <button 
                    onClick={() => window.open(`tel:${phoneCode}1234567890`)}
                    className="px-6 py-3 border-2 border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-xl font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-600 dark:hover:border-purple-300 transition-all duration-300 flex items-center justify-center group"
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

export default MusicInnerPage;