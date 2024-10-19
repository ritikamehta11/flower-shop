const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const { default: mongoose } = require('mongoose');
mongoose
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
        items: [{ product: pid, quantity }],
      });
    }

    const existingItemIndex = cart.items.findIndex(item => item.product._id.toString() === pid);
    
    if (existingItemIndex > -1) {
      // If the item already exists, update the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If the item does not exist, add it to the cart
      cart.items.push({ product: pid, quantity });
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
    const { userId, pid } = req.params; // Get userId and productId from request parameters

    // Step 1: Find the cart for the specific user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' }); // Handle case where cart is not found
    }

    // Step 2: Find the item in the cart by productId
    const itemToRemove = cart.items.find(item => item.product._id.toString() === pid);
    console.log(itemToRemove._id);
    if (!itemToRemove) {
      return res.status(404).json({ msg: 'Item not found in cart' }); // Handle case where item is not found
    }

    // Step 3: Remove the item by item._id
    cart.items = cart.items.filter(item => item._id.toString() !== itemToRemove._id.toString()); // Remove the item

    // Save the updated cart
    await cart.save();

    // Step 4: Return the updated cart
    return res.json(cart); // Send the updated cart back to the client
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ msg: 'Server error' }); // Handle server error
  }
};






// increasing or decreasing quantity
// Increase item quantity in cart
const increaseItemQuantity = async (req, res) => {
  const { userId, pid } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const existingItem = cart.items.find(item => item.product._id.toString() === pid);
    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity by 1
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
 const { userId, pid } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const existingItem = cart.items.find(item => item.product._id.toString() === pid);
    if (existingItem) {
      existingItem.quantity -= 1; // Increase quantity by 1
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

