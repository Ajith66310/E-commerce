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
          { folder }, // optional folder in Cloudinary
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
      images: imageUrls, // 4 URLs
    };

    // save to DB
    const savedProduct = await productModel.create(productData);
    console.log(savedProduct);

    res.json({ success: true, product: savedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export { addProduct, fetchProduct };
