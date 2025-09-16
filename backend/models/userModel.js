import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: String,
  role: { type: String, default: "user" },
  status: { type: String, default: "pending" },
  googleId: String,
  image: String, 
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    phone: String,
  },
  timestamp: { type: Date, default: Date.now },
});

const  userModel = mongoose.model("userModel",userSchema);

export default userModel;