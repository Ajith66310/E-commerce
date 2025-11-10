import express from 'express'
import 'dotenv/config.js'
import { connectDB } from './config/mongodb.js';
import userRouter from './routes/userRouter.js';
import cors from 'cors'
import cookieParser from "cookie-parser";
import adminRouter from './routes/adminRouter.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);



app.use('/',userRouter);
app.use('/admin',adminRouter);
app.use('/api',productRouter);
app.use('/order',orderRouter);

await connectDB();



app.listen('8080',()=>{
  console.log('sever is running');
  
})

