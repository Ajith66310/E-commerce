import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';


const adminLogin = async (req, res) => {

  const { email, password } = req.body;
  const data = await userModel.findOne({ email: email })

  if (!data) {
    return res.status(400).json({ message: "Admin not Found" })
  }

  const token = jwt.sign(
    { email: data.email },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  return res.status(200).json({ message: "Login successfully", token })

}

export { adminLogin }