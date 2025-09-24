import  express  from "express";
import { getProducts,fetchProduct,addProduct} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router()

productRouter.post('/fetchproduct/:id',fetchProduct)
productRouter.post('/add-product',upload.array("img",4),addProduct)
productRouter.get('/adminfetchproducts',getProducts)





export default productRouter;