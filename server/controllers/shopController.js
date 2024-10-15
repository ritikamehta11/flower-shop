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
    try {
        // Check if the file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }
console.log("working fine");
        // Get the Cloudinary image URL from the uploaded file
      const imageUrl = await cloudinary.uploader.upload(req.file.path);
console.log("imageurl",imageUrl);
      const image = imageUrl.secure_url;
      console.log(image);

        // Create the new product with the provided data and image URL
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image, // Store the Cloudinary URL in the product
        });
console.log(newProduct); 
        // Save the product in the database
        await newProduct.save();

        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to create product',
            error: error.message
        });
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
