import sendMail from '../middleware/nodemailer.js';
import userModel from '../models/userModel.js'


const register = async(req,res)=>{
  try {
  const {email} = req.body;
  const data = await userModel.findOne({email : email})
  if(data){
    return res.json({message:"user Exists"})
  }
    sendMail(email)  
  } catch (error) {
    console.log(error);
    
  }

}

const login = async(req,res)=>{

}



export {register,login};