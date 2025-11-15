import express from 'express'
import {adminRemoveUser,adminFetchUser,adminLogin, getDashboardData, blockUser, adminGetUserOrders } from '../controllers/adminController.js';


const adminRouter = express.Router();

adminRouter.post('/login',adminLogin)
adminRouter.get('/adminfetchuser',adminFetchUser)
adminRouter.delete('/removeusers/:id',adminRemoveUser)
adminRouter.get("/fetchorders", adminGetUserOrders);
adminRouter.get("/dashboard", getDashboardData);
adminRouter.patch("/users/:id/block", blockUser);

export default adminRouter;