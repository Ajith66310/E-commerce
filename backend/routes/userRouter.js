import express from 'express'
import {resendResetOtp,registerOtpMail,googleLogin,googleSignup,login,resendOtp,resetPassword,resetOtpVerify,resetOtpMail,signupOtpVerify, } from '../controllers/userController.js';


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

export default userRouter;