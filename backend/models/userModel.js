import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name :{type : String , required:true},
  email : {type:String , required:true, unique:true },
  password : {type:String },
  role : {type:String , default : "user" },
  status : {type:String , default : "pending" },
  googleId:{type:String},
  address:{
      street: {type: String},
      city: {type: String},
      state: {type: String},
      zipcode: {type: String},
      country: {type: String},
      phone:{type: String}
    },
  timestamp :{type:Date, default:Date.now()}
})

const  userModel = mongoose.model("userModel",userSchema);

export default userModel;