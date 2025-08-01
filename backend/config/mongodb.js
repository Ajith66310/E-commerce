import mongoose from 'mongoose' 
import 'dotenv/config.js'


export const connectDB = async(req,res)=>{
await mongoose.connect(process.env.DB).then(()=>{
    console.log('DB Connected');
    
  })
}
