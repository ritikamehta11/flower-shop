const Product = require('../models/shopModel');


//get product by id

const getProduct = async(req, res) => {
  try{
    const productId = await Product.findById(req.params.id);
    if(!productId) return res.status(404).json({ msg: "Not found" });
    res.json(productId);

  }catch(error) {
    console.log(error);
  }
};
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
    const { name, price, description, category } = req.body;
  const image = await cloudinary.uploader.upload(req.file.path);;
    try {
        const product = new Product({
            name,
            price,
            description,
          image,
            category,
        });

        await product.save();
        res.json(product);
    } catch (error) {
      // res.status(500).json({ error: 'Server error' });
      console.log(error);
    }
};


const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Product deleted' });
    } catch (error) {
      console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = { getProduct,getProducts, createProduct ,updateProduct, deleteProduct};