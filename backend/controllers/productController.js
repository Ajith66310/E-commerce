import productModel from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";



/* fetch all products */
const fetchProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // find product by id
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};


const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      percentage, // or rename to discount
      category,
      sizes,
      units,
    } = req.body;

    // parse sizes if sent as JSON string
    const parsedSizes = sizes ? JSON.parse(sizes) : { S: 0, M: 0, L: 0 };

    // helper function to upload buffer to Cloudinary
    const uploadBufferToCloudinary = (fileBuffer, folder = "products") => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder, allowed_formats: ["jpg", "png", "webp","avif"] },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // upload images from req.files
    const uploadPromises = req.files.map((file) =>
      uploadBufferToCloudinary(file.buffer)
    );
    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((r) => r.secure_url);

    // build product object
    const productData = {
      title,
      description,
      price,
      percentage, // or rename to discount
      category,
      sizes: parsedSizes,
      units: Number(units) || 0,
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



const adminGetProducts = async (req, res) => {
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


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    //  Extract public IDs from Cloudinary URLs 
    const extractPublicId = (url) => {
      try {
        const parts = url.split("/");
        const filename = parts.pop().split(".")[0];
        const folder = parts.slice(-2).join("/");
        return `${folder}/${filename}`;
      } catch {
        return null;
      }
    };

    //  Delete product images from Cloudinary 
    if (product.images && product.images.length > 0) {
      for (const imageUrl of product.images) {
        const publicId = extractPublicId(imageUrl);
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.warn(`Failed to delete image: ${publicId}`);
          }
        }
      }
    }

    await productModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, percentage, category, sizes } = req.body;

    // Parse sizes if sent as JSON string
    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        percentage,
        category,
        sizes: parsedSizes,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

 const fetchbycategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await productModel.find({ category });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
 
 }



export {updateProduct ,fetchbycategory, deleteProduct,adminGetProducts, addProduct, fetchProduct };
