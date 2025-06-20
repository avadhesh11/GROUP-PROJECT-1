import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
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
  type: {
    type: String,
    enum: ['Hotel', 'Banquet', 'Lawn', 'Resort', 'Other'],
    required: true
  },
  vegprice: {
    type: Number,
    required: true,
    min: 0
  },
  nonvegprice: {
    type: Number,
    required: true,
    min: 0
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  room: {
    type: Number,
    required: true,
    min: 0
  },
  more: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Use 'Venue' instead of 'User'
const Venue = mongoose.model('Venue', venueSchema);
export default Venue;
