import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique:true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp:{type: String, default:""}
});
const User = mongoose.model('User', userSchema);

export default User;