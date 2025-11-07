import express from "express";
import {
  adminGetProducts,
  fetchProduct,
  addProduct,deleteProduct,updateProduct,
  fetchbycategory,
  fetchBestseller
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.get('/fetchproduct/:id', fetchProduct);
productRouter.post('/add-product', adminAuth, upload.array("img", 4), addProduct);
productRouter.get('/adminfetchproducts', adminGetProducts);
productRouter.delete('/deleteproduct/:id', adminAuth, deleteProduct);
productRouter.put('/updateproduct/:id', adminAuth, updateProduct);
productRouter.get("/fetchbycategory/:category",fetchbycategory);
productRouter.get("/bestsellers",fetchBestseller);



export default productRouter;
