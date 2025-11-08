import express from 'express'
import {adminRemoveUser,adminFetchUser,adminLogin, getUserOrders, getDashboardData } from '../controllers/adminController.js';


const adminRouter = express.Router();

adminRouter.post('/login',adminLogin)
adminRouter.get('/adminfetchuser',adminFetchUser)
adminRouter.delete('/removeusers/:id',adminRemoveUser)
adminRouter.get("/fetchorders", getUserOrders);
adminRouter.get("/dashboard", getDashboardData);


export default adminRouter;