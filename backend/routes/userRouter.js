import express from 'express'
import { registerOtpMail,login, signupOtpVerify, } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post('/registerotpmail',registerOtpMail)
userRouter.post('/signupotpverify',signupOtpVerify)
userRouter.post('/login',login)

export default userRouter;