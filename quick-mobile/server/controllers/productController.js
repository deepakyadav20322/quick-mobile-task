const Product = require("../model/productSchema");

// @desc    Add new product
// @route   POST /api/products
// @access  Public
const AddProduct = async (req, res) => {
  try {
    const { name, variant, price, oldPrice, image, rating, reviews } = req.body;
    console.log("Received product data:", req.body);

    // Validation
    if (!name || !variant || !price || !image) {
      return res.status(400).json({
        success: false,
        message: "Required fields: name, variant, price, image",
      });
    }

    const newProduct = new Product({
      name,
      variant,
      price,
      oldPrice,
      image,
      rating: rating || 0,
      reviews: reviews || 0,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      product: newProduct,
    });

  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const GetProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

  const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

module.exports = { AddProduct, GetProduct,deleteProduct };
