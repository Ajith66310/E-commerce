import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name :{type : String , required:true},
  email : {type:String , required:true, unique:true },
  password : {type:String , required:true },
  role : {type:String , default : "user" },
  otp : {type:Number,default:null,},
  otpExpires:{type:Date,default:()=>new Date(Date.now()+5 * 60 * 1000)},
  timestamp :{type:Date, default:Date.now()}
})

const  userModel = mongoose.model("userModel",userSchema);

export default userModel;