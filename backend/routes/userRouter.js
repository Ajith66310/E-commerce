import express from 'express'
import { registerOtpMail,login, } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post('/registerotpmail',registerOtpMail)
userRouter.post('/login',login)

export default userRouter;