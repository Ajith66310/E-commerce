import userModel from '../models/userModel.js'

const register = async(req,res)=>{
  try {
  const {name,email,password} = req.body;
  const user = new userModel({
    name,
    email,
    password,
  } )
 await user.save();    
   console.log(user);
   
  res.json({message:'user Registered'} )
  } catch (error) {
    console.log(error);
    
  }

}

const login = async(req,res)=>{

}



export {register,login};