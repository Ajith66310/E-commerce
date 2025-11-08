import orderModel from "../models/orderModel.js";
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

const adminRemoveUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "User removed successfully" });
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getUserOrders
const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate({
        path: "userId",
        select: "name email", // get username + email
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(" Error fetching admin orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export {adminRemoveUser, adminFetchUser, adminLogin,getUserOrders }