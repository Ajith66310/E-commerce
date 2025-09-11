import express from 'express'
import 'dotenv/config.js'
import { connectDB } from './config/mongodb.js';
import userRouter from './routes/userRouter.js';
// import productRouter from './routes/productRouter.js';
import cors from 'cors'
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

app.use(cors({
  origin: "http://localhost:5173",   // your frontend URL
  credentials: true,                 // allow cookies
}));

app.use('/',userRouter);
// app.use('/',productRouter);

await connectDB();



app.listen('8080',()=>{
  console.log('sever is running');
  
})

