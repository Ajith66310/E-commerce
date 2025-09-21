import mongoose  from "mongoose";

const productSchema = new  mongoose.Schema({
      id:{type: String, required: true },
      title:{type: String, required: true},
      images: [{ type: String }],
      description:{type: String, required: true},
      price:{type: Number, required: true},
      percentage:{type: String, required: true},
      category: {type: String, required: true},
      subcategory:{type: String, required: true},
      timestamp: { type: Date, default: Date.now },
    },   
) 

const  productModel = mongoose.model("prodctModel",productSchema);

export default productModel;