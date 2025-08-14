import mongoose from "mongoose";

const musicAndDanceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
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
    default: 0,
    min: 0
  },
  experience: {
    type: String,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  teamSize: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MusicAndDance = mongoose.model("MusicAndDance", musicAndDanceSchema);

export default MusicAndDance;
