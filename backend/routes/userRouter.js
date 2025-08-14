import express from 'express'
import { registerOtpMail,login,resetPassword,resetOtpVerify,resetOtpMail,signupOtpVerify, } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post('/registerotpmail',registerOtpMail)
userRouter.post('/signupotpverify',signupOtpVerify)
userRouter.post('/login',login)
userRouter.post('/resetotpmail',resetOtpMail)
userRouter.post('/resetotpverify',resetOtpVerify)
userRouter.post('/resetpassword',resetPassword)

export default userRouter;