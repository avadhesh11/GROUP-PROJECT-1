import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    default: 'https://via.placeholder.com/300'
  },
  title: {
    type: String,
    required: true,
    trim: true
  }
});

const Categories = mongoose.model('Categories', categoriesSchema);

export default Categories;
