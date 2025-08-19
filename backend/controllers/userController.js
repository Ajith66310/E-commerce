import sendMail from '../middleware/nodemailer.js';
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import Redis from 'ioredis'

const redis = new Redis();

const registerOtpMail = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await userModel.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    // Hash password before saving (never keep plain password in DB)
    const hashedPass = await bcrypt.hash(password, 10);

    // Save as pending user
    const newUser = new userModel({
      name,
      email,
      password: hashedPass,
      status: "pending",
    });
    await newUser.save();

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    // Store OTP in Redis (expire in 1 minute)
    await redis.setex(`otp:${email}`, 60, hashedOtp);

    // Send mail
    await sendMail(email, "Your Registration OTP", `Your OTP is: ${otp} (valid 1 min)`);

    // Issue temp token with only email
    const tempToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "5m" });

    return res.status(200).json({ message: "OTP sent to email", tempToken });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const signupOtpVerify = async (req, res) => {
  try {
    const { otp, tempToken } = req.body;
    const decoded = jwt.verify(tempToken, process.env.SECRET_KEY);

    // Fetch OTP from Redis
    const redisOtp = await redis.get(`otp:${decoded.email}`);
    if (!redisOtp) return res.status(400).json({ message: "OTP expired or not found" });

    const isValid = await bcrypt.compare(otp, redisOtp);
    if (!isValid) return res.status(400).json({ message: "Invalid OTP" });

    // Delete OTP from Redis
    await redis.del(`otp:${decoded.email}`);

    // Update user status in DB
    await userModel.findOneAndUpdate(
      { email: decoded.email },
      { $set: { status: "verified" } }
    );

    return res.status(200).json({ message: "User verified successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};



const resendOtp = async (req, res) => {
  try {
    const { tempToken } = req.body;
    const decoded = jwt.verify(tempToken, process.env.SECRET_KEY);

    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    await redis.setex(`otp:${decoded.email}`, 60, hashedOtp);

    await sendMail(decoded.email, "Your Registration OTP", `Your OTP is: ${otp} (valid 1 min)`);

    return res.status(200).json({ message: "OTP resent successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};


const login = async(req,res)=>{
  const {email,password} = req.body;

  const data = await userModel.findOne({email : email});
  
  if (!data){
   return  res.status(400).json({message:"Invalid email or password."})
  }
  
  bcrypt.compare(password,data.password,(err,result)=>{
  
    if(err || !result){
   return res.status(400).json({message:"Enter a valid password"})
   }
  
   if(result){
     const token =  jwt.sign(data.name,process.env.SECRET_KEY);
     return res.status(200).json({message:'Login successful.',token})
   }
  })
}

const resetOtpMail = async(req,res)=>{
    
  const {email} = req.body;

  const data = await userModel.findOne({email : email});

  if (!data){
   return  res.status(400).json({message:"Invalid email address"})
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const hashedOtp = await bcrypt.hash(otp.toString(), 10);
  
  await redis.setex(`otp:${email}`,60,hashedOtp)
  
  await sendMail(
    email,
    'Your Password Reset OTP',
  `Your OTP for password reset is: ${otp}. It will expire in 1 minutes.`
);

    return res.status(200).json({message:"OTP sent to email."})
  }
  
  
const resetOtpVerify = async(req,res)=>{

  const {email,otp} = req.body;
  
  const data = await redis.get(`otp:${email}`);
  
  if (!data) {
    return res.status(400).json({ message: "OTP not found. Please request again." });
  }
  
  const isValid = await bcrypt.compare(otp, data);
  
  if (!isValid) {
    return res.status(400).json({ message: "Invalid OTP. Please try again." });
  }
  
  await redis.del(`otp:${email}`);
  
  if (isValid) {
      
    const token =  jwt.sign({email},process.env.SECRET_KEY,{ expiresIn: "15m" });
    
    const resetLink = `http://localhost:5173/resetpassword/${token}`;
    
     const htmlContent = `
     <div style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 20px;">
     <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p style="color: #555;">
          You requested to reset your password. Click the button below to reset it.
          This link will expire in <b>15 minutes</b>.
          </p>
          <a href="${resetLink}" style="
          display: inline-block;
          padding: 12px 20px;
          margin-top: 15px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          ">
          Reset Password
        </a>
        <p style="color: #777; font-size: 14px; margin-top: 20px;">
          If you didn’t request this, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;
  
 await sendMail(
    email,
    'Password Reset Link',
    htmlContent,
    true // Passing 'true' so nodemailer knows it's HTML
  );

  return res.status(200).json({ message: "Reset link sent to the mail address" });
  }
}


const resetPassword = async(req,res)=>{
  
  const {token,password,confirmPassword} = req.body;

  if(password !== confirmPassword){
    return res.status(400).json({message:"Enter Matching Password"})
  }
  
  const decode = jwt.verify(token,process.env.SECRET_KEY)
  
  const userData = await userModel.findOne({email:decode.email})
  
  if(!userData){
  return res.status(400).json({message:"Can't find the user with this email"})
}


if(userData){
   const hashedPass = await bcrypt.hash(confirmPassword,10)
   userData.password = hashedPass;
   await userData.save()
   return res.status(200).json({message:"Your password reset successfully"})
  }
}



export {resendOtp,resetOtpVerify,registerOtpMail,signupOtpVerify,resetOtpMail,login,resetPassword};