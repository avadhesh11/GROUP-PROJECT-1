import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/300"
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ["Traditional", "Modern", "Floral", "Classic", "Bohemian"]
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  designs: {
    type: Number,
    default: 0,
    min: 0
  },
  customizable: {
    type: Boolean,
    default: false
  },
  format: {
    type: String,
    required: true
  },
  deliveryTime: {
    type: String,
    required: true
  },
  designer: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Invitation = mongoose.model("Invitation", invitationSchema);

export default Invitation;
