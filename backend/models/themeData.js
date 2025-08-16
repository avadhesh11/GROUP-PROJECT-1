import mongoose from "mongoose";

const themeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    default: 'https://via.placeholder.com/400x300'
  },
 image: {
    type: String,
    required: true,
    default: 'https://via.placeholder.com/300'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  review: {
    type: Number,
    default: 0,
    min: 0
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Luxury', 'Traditional', 'Modern', 'Garden', 'Vintage', 'Floral', 'Royal', 'Beach', 'Other'],
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  maxGuests: {
    type: Number,
    default: 500,
    min: 1
  },
  elements: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    trim: true
  },
  colorPalette: {
    type: [String],
    default: []
  },
  suitableEvents: {
    type: [String],
    enum: ['Wedding', 'Engagement', 'Birthday', 'Anniversary', 'Corporate Event', 'Baby Shower', 'Reception', 'Sangeet', 'Mehendi', 'Other'],
    default: ['Wedding']
  },
  setupTime: {
    type: String,
    default: '4-6 hours'
  },
  teamSize: {
    type: String,
    default: '8-12 professionals'
  },
  isBreakdownIncluded: {
    type: Boolean,
    default: true
  },
  gallery: {
    type: [String],
    default: []
  },
  isCustomizable: {
    type: Boolean,
    default: true
  },
  availability: {
    type: String,
    enum: ['Available', 'Busy', 'Unavailable'],
    default: 'Available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
themeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// ✅ Create Theme model
const Theme = mongoose.model('Theme', themeSchema);
export default Theme;