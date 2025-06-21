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
    default: 'https://via.placeholder.com/300'
  },
  location: {
    type: String,
    required: true
  }
});

const Theme= mongoose.model('Themes', themeSchema);
export default Theme;
