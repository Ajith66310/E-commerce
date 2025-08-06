import sendMail from '../middleware/nodemailer.js';
import otpModel from '../models/otpModel.js';
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'

const register = async(req,res)=>{
  try {
  const {email} = req.body;
  const data = await userModel.findOne({email : email})
  if(data){
    return res.status(404).json({message:"user Exists"})
  }else{
      const otp = Math.round(Math.random()*10000)+111111
    const hashedOtp = await bcrypt.hash(otp.toString(),10)
    const user = new otpModel({
      email,
      otp:hashedOtp,
    })
    user.save()
    sendMail(email,otp); 
    return res.status(200).json({message:"otp sended"})
  }
  } catch (error) {
    console.log(error);
    
  }
}

const otpverify = async()=>{
  const {name,email,password,otp} = req.body;

  const data = await otpModel.findOne({email})

  data

}

const login = async(req,res)=>{

}



export {otpverify,register,login};