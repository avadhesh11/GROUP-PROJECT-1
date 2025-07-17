import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String, // URL or filename stored on your server
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  review: {
    type: Number,
    default: 0
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Veg', 'Non-Veg', 'Veg-Menu', 'Non-Veg-Menu', 'Both'], // customize as needed
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Foods = mongoose.model('Food', FoodSchema);

export default Foods;
