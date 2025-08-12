import express from 'express'
import { registerOtpMail,login,resetOtpMail,signupOtpVerify, } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post('/registerotpmail',registerOtpMail)
userRouter.post('/signupotpverify',signupOtpVerify)
userRouter.post('/login',login)
userRouter.post('/resetotpmail',resetOtpMail)

export default userRouter;