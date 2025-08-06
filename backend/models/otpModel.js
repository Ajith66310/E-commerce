import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
email:{type:String , required:true},
otp:{type:String , default:null, expires:300}
})

const  otpModel = mongoose.model("otpModel",otpSchema);

export default otpModel;