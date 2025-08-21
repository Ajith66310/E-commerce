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

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPass,
      status: "pending",
    });
    await newUser.save();

    // OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    await redis.setex(`otp:${email}`, 60, hashedOtp);

    await sendMail(email, "Your Registration OTP", `Your OTP is: ${otp} (valid 1 min)`);

    // Generate tempToken
    const tempToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "15m" });

    // ✅ Store token in httpOnly cookie
    res.cookie("tempToken", tempToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in HTTPS
      sameSite: "Strict", // prevents CSRF
      maxAge: 5 * 60 * 1000, // 5 min
    });

    return res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


const signupOtpVerify = async (req, res) => {
  try {

    const { otp } = req.body;
    const tempToken = req.cookies.tempToken; // ✅ read from cookie

    if (!tempToken) {
      return res.status(400).json({ message: "Token missing. Please try again." });
    }

    const decoded = jwt.verify(tempToken, process.env.SECRET_KEY);
    const redisOtp = await redis.get(`otp:${decoded.email}`);
    if (!redisOtp) return res.status(400).json({ message: "OTP expired or not found" });

    const isValid = await bcrypt.compare(otp, redisOtp);
    if (!isValid) return res.status(400).json({ message: "Invalid OTP" });

    await redis.del(`otp:${decoded.email}`);

    await userModel.findOneAndUpdate(
      { email: decoded.email },
      { $set: { status: "verified" } }
    );

    // ✅ Clear cookie after success
    res.clearCookie("tempToken");

    return res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};



const resendOtp = async (req, res) => {
  try {
    const tempToken = req.cookies.tempToken; // ✅ get token from cookie

    if (!tempToken) return res.status(400).json({ message: "Missing token" });

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

const resetOtpMail = async (req, res) => {
  try {
    const { email } = req.body;

    const data = await userModel.findOne({ email: email });

    if (!data) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    await redis.setex(`otp:${email}`, 60, hashedOtp);

    await sendMail(
      email,
      'Your Password Reset OTP',
      `Your OTP for password reset is: ${otp}. It will expire in 1 minute.`
    );

    // Issue temp token with only email
    const tempResetToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "15m" });

     res.cookie("tempResetToken", tempResetToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in HTTPS
      sameSite: "Strict", // prevents CSRF
      maxAge: 5 * 60 * 1000, // 5 min
    });

    return res.status(200).json({
      message: "OTP sent to email.",
      tempResetToken : tempResetToken
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
  
  
const resetOtpVerify = async (req, res) => {
  try {
    const { otp } = req.body;

    const tempResetToken = req.cookies.tempResetToken;

    if (!tempResetToken) {
      return res.status(400).json({ message: "Token missing" });
    }
    
    const decode = jwt.verify(tempResetToken, process.env.SECRET_KEY);
    const email = decode.email;
    const data = await redis.get(`otp:${decode.email}`);

    if (!data) {
      return res.status(400).json({ message: "OTP not found. Please request again." });
    }

    const isValid = await bcrypt.compare(otp, data);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }

    await redis.del(`otp:${decode.email}`);

    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "15m" });
    const resetLink = `http://localhost:5173/resetpassword/${token}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 20px;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password. Click below:</p>
          <a href="${resetLink}" style="padding:10px 20px; background:#007bff; color:#fff; border-radius:5px; text-decoration:none;">Reset Password</a>
        </div>
      </div>
    `;

    await sendMail(email, 'Password Reset Link', htmlContent, true);

    return res.status(200).json({ message: "Reset link sent to the mail address" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

const resendResetOtp = async (req, res) => {
  try {
    const { tempResetToken } = req.cookies;

    if (!tempResetToken) {
      return res.status(400).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(tempResetToken, process.env.SECRET_KEY);
    const email = decoded.email;

    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    await redis.setex(`otp:${email}`, 60, hashedOtp);

    await sendMail(
      email,
      "Your Password Reset OTP",
      `Your OTP for password reset is: ${otp} (valid 1 min)`
    );

    return res.status(200).json({ message: "Password reset OTP resent successfully" });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

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





export {resendResetOtp,resendOtp,resetOtpVerify,registerOtpMail,signupOtpVerify,resetOtpMail,login,resetPassword};