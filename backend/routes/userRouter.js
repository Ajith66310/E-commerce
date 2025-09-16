import express from 'express'
import {resendResetOtp,fetchUser,userAddress,registerOtpMail,googleLogin,googleSignup,login,resendOtp,resetPassword,resetOtpVerify,resetOtpMail,signupOtpVerify, } from '../controllers/userController.js';
import upload from '../middleware/multer.js'

const userRouter = express.Router();

userRouter.post('/registerotpmail',registerOtpMail)
userRouter.post('/signupotpverify',signupOtpVerify)
userRouter.post('/login',login)
userRouter.post('/resetotpmail',resetOtpMail)
userRouter.post('/resetotpverify',resetOtpVerify)
userRouter.post('/resetpassword',resetPassword)
userRouter.post('/resendotp',resendOtp)
userRouter.post('/resendresetotp',resendResetOtp)
userRouter.post('/google-signup',googleSignup)
userRouter.post('/google-login',googleLogin)
userRouter.post('/fetch-user',fetchUser)
userRouter.post('/user-address', upload.single('image'), userAddress);

export default userRouter;