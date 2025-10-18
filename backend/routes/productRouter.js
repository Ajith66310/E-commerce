import express from "express";
import {
  adminGetProducts,
  fetchProduct,
  addProduct
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.get('/fetchproduct/:id', fetchProduct);

productRouter.post('/add-product', adminAuth, upload.array("img", 4), addProduct);

productRouter.get('/adminfetchproducts', adminGetProducts);

export default productRouter;
