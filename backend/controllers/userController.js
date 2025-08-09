import sendMail from '../middleware/nodemailer.js';
import otpModel from '../models/otpModel.js';
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const registerOtpMail = async(req,res)=>{
  try {
  const {name,email,password} = req.body;

  const regexEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!regexEmail.test(email)) {
  return res.status(400).json({ message: "Invalid Email format" });
  }

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!regexPassword.test(password)) {
  return res.status(400).json({ message: "Atleast one uppercase,lowercase,digits,special characters" });
  }

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
    return res.status(200).json({message:"Otp send successfully"})
  }
  } catch (error) {
    console.log(error);    
  }
}

const signupOtpVerify = async(req,res)=>{

  const {name,email,password,otp} = req.body;
  const data = await otpModel.findOne({email})

  bcrypt.compare(otp,data.otp,(err,result)=>{
    if (err || !result) {
      return res.status(400).json({ message: "Invalid OTP. Please try again." });
    } 
  })
    const pass = await bcrypt.hash(password,10) 
    const user = new userModel({
      name,
      email,
      password:pass,
      otp,
    })
    await user.save()
    res.status(200).json({message:"User Registered"})

  }

const login = async(req,res)=>{

  const {email,password} = req.body;
 
  const data = await userModel.findOne({email : email});
  
  if (!data){
   return  res.status(400).json({message:"Enter a valid email"})
  }
  
   bcrypt.compare(password,data.password,(err,result)=>{
   if(err || !result){
   return res.status(400).json({message:"Enter a valid password"})
   }
   if(result){
     const token =  jwt.sign(data.name,process.env.SECRET_KEY);
     return res.status(200).json({message:'Login Successfully',token})
   }
  })
  
  

}



export {registerOtpMail,signupOtpVerify,login};