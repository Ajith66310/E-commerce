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
const otp = Math.floor(100000 + Math.random() * 900000);
const hashedOtp = await bcrypt.hash(otp.toString(), 10);

await otpModel.create({ email, otp: hashedOtp });

await sendMail(
  email,
  'Your Registration OTP',
  `Your OTP for registration is: ${otp}. It will expire in 5 minutes.`
);

    return res.status(200).json({message:"Otp send successfully"})
  }
  } catch (error) {
    console.log(error);    
  }
}

const signupOtpVerify = async(req,res)=>{

  const {name,email,password,otp} = req.body;

  const data = await otpModel.findOne({email})
  

  if (!data) {
    return res.status(400).json({ message: "OTP not found. Please request again." });
  }

  const isValid = await bcrypt.compare(otp, data.otp);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid OTP. Please try again." });
  }
  const pass = await bcrypt.hash(password,10) 
  
  const otpmodel = new userModel({
      name,
      email,
      password:pass,
      otp,
    })
  
    await otpmodel.save()
  
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

const resetOtpMail = async(req,res)=>{
    const {email} = req.body;

  const data = await userModel.findOne({email : email});
  if (!data){
   return  res.status(400).json({message:"Enter a valid email"})
  }
const otp = Math.floor(100000 + Math.random() * 900000);
const hashedOtp = await bcrypt.hash(otp.toString(), 10);

await otpModel.create({ email, otp: hashedOtp });

await sendMail(
  email,
  'Your Password Reset OTP',
  `Your OTP for password reset is: ${otp}. It will expire in 5 minutes.`
);

    return res.status(200).json({message:"Otp send successfully"})
}

const resetOtpVerify = async(req,res)=>{

  const {email,otp} = req.body;

  const data = await otpModel.findOne({email})
  
  
  if (!data) {
    return res.status(400).json({ message: "OTP not found. Please request again." });
  }

  const isValid = await bcrypt.compare(otp, data.otp);
  
  if (!isValid) {
    return res.status(400).json({ message: "Invalid OTP. Please try again." });
  }
  if (isValid) {
  const resetLink = `https://localhost:5173/resetpassword`;

   await sendMail(
  email,
  'Password Reset Link',
  `Click this link to reset your password: ${resetLink}`
  );

    return res.status(200).json({ message: "Reset link sent to the mail" });
  }
}

export {resetOtpVerify,registerOtpMail,signupOtpVerify,resetOtpMail,login};