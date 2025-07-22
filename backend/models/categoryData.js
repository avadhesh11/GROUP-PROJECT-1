import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  image: {
    type: String,
     
    default: 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  to:{
type: String,
  }
});

const Categories = mongoose.model('Categories', categoriesSchema);

export default Categories;
