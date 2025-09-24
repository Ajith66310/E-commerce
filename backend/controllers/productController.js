import productModel from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";



/* fetch all products */
const fetchProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/* add a product */
const addProduct = async (req, res) => {
  try {
    const { id, title, description, price, percentage, category, subcategory } = req.body;

    /* helper function inside this file */
    const uploadBufferToCloudinary = (fileBuffer, folder = "products") => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder, allowed_formats:["jpg","png","webp"] }, // optional folder in Cloudinary
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };
    // upload all files to Cloudinary in parallel:
    const uploadPromises = req.files.map((file) =>
      uploadBufferToCloudinary(file.buffer, "products")
    );
    const uploadResults = await Promise.all(uploadPromises);

    // get the secure URLs:
    const imageUrls = uploadResults.map((r) => r.secure_url);

    // build your product object:
    const productData = {
      id,
      title,
      description,
      price,
      percentage,
      category,
      subcategory,
      images: imageUrls, 
    };

    // save to DB
    const savedProduct = await productModel.create(productData);

    res.json({ success: true, product: savedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await productModel.find().skip(skip).limit(limit);
    const count = await productModel.countDocuments();

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};




export { getProducts, addProduct, fetchProduct };
