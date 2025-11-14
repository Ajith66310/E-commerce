import sendMail from '../middleware/nodemailer.js';
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import Redis from 'ioredis'
import { RegisterSuccessEmail } from "../templates/RegisterSuccessEmail.js";
import { resend, FROM_EMAIL } from "../middleware/resendMailer.js";
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';


const redis = new Redis();

const registerOtpMail = async (req, res) => {
  try {
    const { name, email, password } = req.body;

   //  Email format: must be username@gmail.com
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format. Must be username@gmail.com" });
    }

    // //  Password format: at least 8 chars, one uppercase, one lowercase, one number, one special char
const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=|\\{}[\]:;"'<>,.?/~`]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must include at least 8 characters, one uppercase, one lowercase, one number, and one special character",
      });
    }
 


    const existing = await userModel.findOne({ email });

    if (existing) {
      if (!existing.password) {
        const hashedPass = await bcrypt.hash(password, 10);
        existing.password = hashedPass;
        await existing.save();
      } else {
        return res.status(400).json({ message: "Email already Registered" });
      }
    } else {
      const newUser = new userModel({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        googleId: "",
        status: "pending",
      });
      await newUser.save();
    }

    // OTP logic...
    const otp = Math.floor(100000 + Math.random() * 900000);
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);
    await redis.setex(`otp:${email}`, 60, hashedOtp);

    await sendMail(email, "Your Registration OTP", `Your OTP is: ${otp} (valid 1 min)`);

    const tempToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "15m" });
    res.cookie("tempToken", tempToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 5 * 60 * 1000,
    });

    return res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};




const signupOtpVerify = async (req, res) => {

  try {

    const { otp } = req.body;
    const tempToken = req.cookies.tempToken;

    if (!tempToken) return res.status(400).json({ message: "Token missing. Please try again." });

    const decoded = jwt.verify(tempToken, process.env.SECRET_KEY);
    const redisOtp = await redis.get(`otp:${decoded.email}`);
    if (!redisOtp) return res.status(400).json({ message: "OTP expired or not found" });

    const isValid = await bcrypt.compare(otp, redisOtp);
    if (!isValid) return res.status(400).json({ message: "Invalid OTP" });

    await redis.del(`otp:${decoded.email}`);

    const user = await userModel.findOneAndUpdate(
      { email: decoded.email },
      { $set: { status: "verified" } },
      { new: true }
    );

    res.clearCookie("tempToken");

    // Send success mail
    try {
      const emailHtml = RegisterSuccessEmail(user.name);
      await resend.emails.send({
        from: FROM_EMAIL,
        to: "ajithnubie@gmail.com",
        subject: "🎉 Registration Successful",
        html: emailHtml,
      });
    } catch (mailErr) {
      console.error("Resend mail failed:", mailErr);
    }

    return res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};



const resendOtp = async (req, res) => {
  try {
    const tempToken = req.cookies.tempToken; 

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


const login = async (req, res) => {
  const { email, password } = req.body;

   //  Email format: must be username@gmail.com
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format. Must be username@gmail.com" });
    }

    // //  Password format: at least 8 chars, one uppercase, one lowercase, one number, one special char
const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=|\\{}[\]:;"'<>,.?/~`]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must include at least 8 characters, one uppercase, one lowercase, one number, and one special character",
      });
    }
 

  const data = await userModel.findOne({ email: email });

  if (!data) {
    return res.status(404).json({ message: "User not found, Please Register first" });
  }

  if (data.isBlocked === true) {
    return res.status(404).json({ message: "User blocked by admin" });
  }
  bcrypt.compare(password, data.password, (err, result) => {

    if (err || !result) {
      return res.status(400).json({ message: "Enter a valid password" })
    }

if (result) {
  const token = jwt.sign({ id: data._id, email: data.email }, process.env.SECRET_KEY, { expiresIn: '7d' });
  return res.status(200).json({ message: 'Login successful.', token });
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
      tempResetToken: tempResetToken
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
    const data = await redis.get(`otp:${email}`);

    if (!data) {
      return res.status(400).json({ message: "OTP not found. Please request again." });
    }

    const isValid = await bcrypt.compare(otp, data);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }

    await redis.del(`otp:${email}`);

    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "15m" });
    const resetLink = `${process.env.FRONTEND_URL}/resetpassword/${token}`;

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

    return res.status(200).json({ message: "OTP resend successfully" });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

const resetPassword = async (req, res) => {

  const { token, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Enter Matching Password" })
  }

  const decode = jwt.verify(token, process.env.SECRET_KEY)

  const userData = await userModel.findOne({ email: decode.email })

  if (!userData) {
    return res.status(400).json({ message: "Can't find the user with this email" })
  }


  if (userData) {
    const hashedPass = await bcrypt.hash(confirmPassword, 10)
    userData.password = hashedPass;
    await userData.save()
    return res.status(200).json({ message: "Your password reset successfully" })
  }
}



const googleLogin = async (req, res) => {

  const { email, googleId } = req.body;

  const data = await userModel.findOne({ email: email })
   if (data.isBlocked === true) {
    return res.status(404).json({ message: "User blocked by admin" });
  }

  if (!data) {
    return res.status(404).json({ message: "User not found, Please register" });
  }

  const googleIdVerify = await bcrypt.compare(googleId, data.googleId)

  if (data.email === email && googleIdVerify) {
    const token = jwt.sign({ id: data._id, email: data.email }, process.env.SECRET_KEY, { expiresIn: "7d" });
    return res.status(200).json({ message: "Login successfully", token })
  }
};



const googleSignup = async (req, res) => {
  try {
    const { name, email, googleId } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      if (!existingUser.googleId) {
        const hashedGoogleId = await bcrypt.hash(googleId, 10);
        existingUser.googleId = hashedGoogleId;
        await existingUser.save();
      } else {
        return res.status(200).json({ message: "Email already registered" });
      }
    } else {
      const hashedGoogleId = await bcrypt.hash(googleId, 10);
      const newUser = new userModel({
        name,
        email,
        googleId: hashedGoogleId,
        password: "",
        status: "verified",
      });
      await newUser.save();
    }

    const data = await userModel.findOne({ email });
    if (data) {
      const token = jwt.sign({ id: data._id, email: data.email }, process.env.SECRET_KEY, { expiresIn: "7d" });
      try {
        const emailHtml = RegisterSuccessEmail(data.name);
        await resend.emails.send({
          from: FROM_EMAIL,
          to: "ajithnubie@gmail.com",
          subject: "🎉 Registration Successful",
          html: emailHtml,
        });
      } catch (mailErr) {
        console.error("Resend mail failed:", mailErr);
      }
      return res.json({ message: "User registered successfully.", token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Google signup failed." });
  }
};

const fetchUser = async (req, res) => {
  try {
    const { email } = req.body;
    const decoded = jwt.decode(email)
    const userData = await userModel.findOne({ email: decoded.email });
    return res.status(200).json({ userData })
  } catch (error) {
    console.log(error);
  }
}



const userAddress = async (req, res) => {
  try {
    
    const { email, address } = req.body;
    const parsedAddress = JSON.parse(address);

    let imageUrl;
    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'user_profiles',allowed_formats:["jpg","png","webp"]},
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
    }

    const update = {
      address: parsedAddress,
      ...(imageUrl && { image: imageUrl }),
    };

    await userModel.findOneAndUpdate({ email }, { $set: update }, { new: true });

    res.status(200).json({ message: 'Address saved' });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'An Error occur while saving' });
  }
};

const fetchUserAddress = async (req, res) => {
  try {
    const token = req.headers.token; 

    if (!token || typeof token !== "string") {
      return res.status(401).json({ message: "Token missing or invalid" });
    }

    const decoded = jwt.verify(token,process.env.SECRET_KEY); 

    const data = await userModel.findOne({email:decoded.email})
    
    if(data.address){
      res.json({ success: true, data });    
    }

  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


export { fetchUserAddress,userAddress, fetchUser, resendResetOtp, resendOtp, resetOtpVerify, googleSignup, registerOtpMail, signupOtpVerify, resetOtpMail, login, resetPassword, googleLogin };