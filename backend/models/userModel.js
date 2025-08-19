import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name :{type : String , required:true},
  email : {type:String , required:true, unique:true },
  password : {type:String , required:true },
  role : {type:String , default : "user" },
  status : {type:String , default : "pending" },
  timestamp :{type:Date, default:Date.now()}
})

const  userModel = mongoose.model("userModel",userSchema);

export default userModel;