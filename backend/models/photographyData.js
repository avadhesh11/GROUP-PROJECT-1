import mongoose from "mongoose";

const photographerSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: true,
    min: 0
  },
  photos: { 
    type: Number,
    required: true,
    min: 0
  },
  videos: { 
    type: Number,
    required: true,
    min: 0
  },
  experience: { 
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Photographer = mongoose.model('Photographer', photographerSchema);

export default Photographer;
