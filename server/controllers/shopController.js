const Product = require('../models/shopModel');

// get all products

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};


// Create new product (Admin only)
const createProduct = async (req, res) => {
    const { name, price, description, imageUrl, category } = req.body;

    try {
        const product = new Product({
            name,
            price,
            description,
          imageUrl,
            category,
        });

        await product.save();
        res.json(product);
    } catch (error) {
      // res.status(500).json({ error: 'Server error' });
      console.log(error);
    }
};

module.exports = { getProducts, createProduct };