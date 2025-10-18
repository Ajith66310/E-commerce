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

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });


  return res.status(200).json({ message: "Login successfully", token })

}

const adminFetchUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await userModel.find().skip(skip).limit(limit);
    const count = await userModel.countDocuments();

    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { adminFetchUser, adminLogin }