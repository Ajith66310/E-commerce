import express from 'express'
import {adminFetchUser,adminLogin } from '../controllers/adminController.js';


const adminRouter = express.Router();

adminRouter.post('/login',adminLogin)
adminRouter.get('/adminfetchuser',adminFetchUser)


export default adminRouter;