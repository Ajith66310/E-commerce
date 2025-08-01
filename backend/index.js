import express from 'express'
import 'dotenv/config.js'
import { connectDB } from './config/mongodb.js';
import userRouter from './routes/userRouter.js';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use('/',userRouter);

await connectDB();



app.listen('8080',()=>{
  console.log('sever is running');
  
})

