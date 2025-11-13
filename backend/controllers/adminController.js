import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import jwt from 'jsonwebtoken';
import { notifyUser } from "../index.js";

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

// getUserOrders
const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate({
        path: "userId",
        select: "name email", 
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


 const getDashboardData = async (req, res) => {
  try {
    // Total counts
    const totalUsers = await userModel.countDocuments();
    const totalProducts = await productModel.countDocuments();
    const totalOrders = await orderModel.countDocuments();

    // Total revenue (sum of all order amounts)
    const totalRevenueData = await orderModel.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = totalRevenueData[0]?.total || 0;

    // Monthly revenue (for graphs)
    const monthlyRevenue = await orderModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRevenue: { $sum: "$amount" },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const formattedMonthlyRevenue = monthlyRevenue.map((item) => ({
      month: new Date(0, item._id - 1).toLocaleString("default", {
        month: "short",
      }),
      revenue: item.totalRevenue,
      orders: item.totalOrders,
    }));

    res.status(200).json({
      success: true,
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      monthlyRevenue: formattedMonthlyRevenue,
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch data" });
  }
};

const adminRemoveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Notify user instantly
    notifyUser(id, "removed");

    return res.status(200).json({ success: true, message: "User removed successfully" });
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Block/unblock user + notify frontend
const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.isBlocked = !user.isBlocked;
    await user.save();

    //  Notify the user (blocked/unblocked)
    const action = user.isBlocked ? "blocked" : "unblocked";
    notifyUser(id, action);

    res.json({
      success: true,
      message: `User ${action} successfully`,
      isBlocked: user.isBlocked,
    });
  } catch (error) {
    console.error("Error blocking/unblocking user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export {blockUser,adminRemoveUser,adminFetchUser,adminLogin,getUserOrders,getDashboardData}