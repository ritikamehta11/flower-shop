const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');


// Fetch user's cart
const getCart= async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.product');
    console.log("cart at backend", cart);
    console.log("cart items in the backend:", cart.items);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart
const addToCart= async (req, res) => {
  const { userId, pid, quantity } = req.body;
  
  try {
    let cart = await Cart.findOne({ userId }).populate('items.product');
    
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ product: pid }, quantity],
      });
    }

    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === pid);
    
    if (existingItemIndex > -1) {
      // If the item already exists, update the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If the item does not exist, add it to the cart
      cart.items.push({ product: pid }, quantity );
    }

    await cart.save();
   cart = await Cart.findOne({ userId }).populate('items.product');
    //console.log(cart);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart


const deleteItemFromCart = async (req, res) => {


  try {
    const { userId, product } = req.body;

    // Find the cart by userId and remove the item by productId
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { 'product._id': mongoose.Types.ObjectId(product) } } }, // Remove the item with the given productId
      { new: true } // Return the updated cart
    ).populate('items.product'); // Ensure productId is populated

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    return res.json(cart); // Send the updated cart back to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
  
};




// increasing or decreasing quantity
// Increase item quantity in cart
const increaseItemQuantity = async (req, res) => {
  const { userId, product } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === product);
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += 1; // Increase quantity by 1
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Decrease item quantity in cart
const decreaseItemQuantity = async (req, res) => {
  const { userId, product } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === product);
    if (existingItemIndex > -1) {
      if (cart.items[existingItemIndex].quantity > 1) {
        cart.items[existingItemIndex].quantity -= 1; // Decrease quantity by 1
      } else {
        // If quantity is 1, you might want to remove it from the cart instead
        cart.items.splice(existingItemIndex, 1);
      }
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add routes for increase and decrease quantity


module.exports = {getCart,addToCart,deleteItemFromCart, increaseItemQuantity, decreaseItemQuantity};

