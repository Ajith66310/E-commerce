import  express  from "express";
import { fetchProduct,addProduct} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router()

productRouter.use('/fetchproduct/:id',fetchProduct)
productRouter.use('/add-product',upload.array("img",4),addProduct)





export default productRouter;