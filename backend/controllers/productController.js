import products from "../../frontend/src/assets/images.js";


const FetchProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = products.find((item) => item.id === id);

    console.log(product);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



export {FetchProduct}
