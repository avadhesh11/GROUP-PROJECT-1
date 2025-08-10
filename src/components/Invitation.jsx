import React, { useState, useEffect } from 'react';
import { Star, MapPin, Heart, Filter, ChevronDown, Eye, Palette, Image, Clock, Sparkles } from 'lucide-react';

// Sample images for demonstration
const sampleImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
];

function WeddingInvitations() {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = [
        {
          _id: 1,
          image: sampleImages[0],
          title: "Elegant Gold Collection",
          rating: "4.8",
          reviews: "156",
          category: "Traditional",
          price: "2999",
          designs: "25",
          customizable: true,
          format: "Digital & Print",
          deliveryTime: "24 hours",
          designer: "Royal Designs"
        },
        {
          _id: 2,
          image: sampleImages[1],
          title: "Floral Romance Suite",
          rating: "4.9",
          reviews: "203",
          category: "Floral",
          price: "3499",
          designs: "30",
          customizable: true,
          format: "Digital Only",
          deliveryTime: "12 hours",
          designer: "Bloom Studio"
        },
        {
          _id: 3,
          image: sampleImages[2],
          title: "Modern Minimalist",
          rating: "4.7",
          reviews: "98",
          category: "Modern",
          price: "2499",
          designs: "18",
          customizable: true,
          format: "Print Only",
          deliveryTime: "48 hours",
          designer: "Clean Designs"
        },
        {
          _id: 4,
          image: sampleImages[3],
          title: "Royal Heritage",
          rating: "4.9",
          reviews: "187",
          category: "Traditional",
          price: "4999",
          designs: "40",
          customizable: true,
          format: "Digital & Print",
          deliveryTime: "24 hours",
          designer: "Heritage Arts"
        },
        {
          _id: 5,
          image: sampleImages[0],
          title: "Bohemian Dreams",
          rating: "4.6",
          reviews: "142",
          category: "Bohemian",
          price: "3299",
          designs: "22",
          customizable: true,
          format: "Digital Only",
          deliveryTime: "12 hours",
          designer: "Free Spirit"
        },
        {
          _id: 6,
          image: sampleImages[1],
          title: "Classic Elegance",
          rating: "4.8",
          reviews: "234",
          category: "Classic",
          price: "3999",
          designs: "35",
          customizable: true,
          format: "Digital & Print",
          deliveryTime: "24 hours",
          designer: "Timeless Creations"
        }
      ];
      setInvitations(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = ['all', 'Traditional', 'Modern', 'Floral', 'Classic', 'Bohemian'];

  const filteredInvitations = activeCategory === 'all' 
    ? invitations 
    : invitations.filter(inv => inv.category === activeCategory);

  const InvitationCard = ({ image, title, rating, reviews, category, price, designs, customizable, format, deliveryTime, designer }) => (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-pink-200 hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <Palette size={14} className="mr-1 text-pink-500" />
            {category}
          </span>
        </div>
        
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
          <Heart size={18} className="text-white group-hover:text-pink-400 group-hover:fill-current transition-colors" />
        </button>

        {/* Preview Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:bg-white transition-colors">
            <Eye size={24} className="text-pink-600" />
          </button>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="text-sm font-semibold text-gray-800">{rating}</span>
          <span className="text-xs text-gray-600">({reviews} reviews)</span>
        </div>

        {/* Customizable Badge */}
        {customizable && (
          <div className="absolute bottom-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full">
            <span className="text-xs font-semibold flex items-center">
              <Sparkles size={12} className="mr-1" />
              Customizable
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Designer */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center text-gray-600">
            <span className="text-sm">by {designer}</span>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">₹{parseInt(price).toLocaleString()}</div>
            <div className="text-sm text-gray-600">starting price</div>
            <div className="mt-2 text-xs text-pink-600 font-medium">Complete invitation suite</div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
            <Clock size={14} className="text-blue-500" />
            <div>
              <div className="text-xs text-gray-500">Delivery</div>
              <div className="text-sm font-medium text-blue-700">{deliveryTime}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
            <Image size={14} className="text-green-500" />
            <div>
              <div className="text-xs text-gray-500">Designs</div>
              <div className="text-sm font-medium text-green-700">{designs} variations</div>
            </div>
          </div>
        </div>

        {/* Format and Features */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-1 bg-orange-50 px-3 py-1 rounded-full">
            <span className="text-sm text-orange-700 font-medium">{format}</span>
          </div>
          
          <div className="bg-pink-50 px-3 py-1 rounded-full">
            <span className="text-sm text-pink-700 font-medium">Premium Quality</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
            <Eye size={16} className="mr-2" />
            View Collection
          </button>
          <button className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-all duration-300">
            <Heart size={18} className="text-gray-600 hover:text-pink-500" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">      
      {/* Header Section with Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={sampleImages[0]} 
          alt="Wedding Invitations" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 via-purple-900/70 to-pink-900/80"></div>
        
        {/* Animated Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 animate-bounce text-white/20">
            <Heart size={32} />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-pulse text-white/20" style={{ animationDelay: '1s' }}>
            <Sparkles size={24} />
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-bounce text-white/20" style={{ animationDelay: '2s' }}>
            <Palette size={28} />
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              WEDDING INVITATIONS
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Create beautiful memories that begin with the perfect invitation
            </p>
            <div className="mt-6">
              <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-lg font-semibold">
                {invitations.length} Premium Collections
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeCategory === category
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {category === 'all' ? 'All Collections' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              <span className="font-medium text-gray-900">{filteredInvitations.length}</span> collections found
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} />
              <span>Filters</span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Price Range</option>
                  <option>₹1,000-3,000</option>
                  <option>₹3,000-5,000</option>
                  <option>₹5,000+</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Format</option>
                  <option>Digital Only</option>
                  <option>Print Only</option>
                  <option>Digital & Print</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Delivery Time</option>
                  <option>12 hours</option>
                  <option>24 hours</option>
                  <option>48 hours</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-lg">
                  <option>Features</option>
                  <option>Customizable</option>
                  <option>Multiple Designs</option>
                  <option>Premium Quality</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invitations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="flex space-x-3">
                    <div className="flex-1 h-12 bg-gray-200 rounded"></div>
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInvitations.map((invitation) => (
              <InvitationCard key={invitation._id} {...invitation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WeddingInvitations;