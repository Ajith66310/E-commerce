import express from 'express'
import { register,login } from '../controllers/userController.js';
import sendMail from '../middleware/nodemailer.js';

const userRouter = express.Router();

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/sendmail',sendMail)

export default userRouter;