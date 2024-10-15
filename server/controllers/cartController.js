const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');


// Fetch user's cart
const getCart= async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart
const addToCart= async (req, res) => {
  const { userId, productId, quantity } = req.body;
  
  try {
    let cart = await Cart.findOne({ userId }).populate('items.productId');;
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    
    if (existingItemIndex > -1) {
      // If the item already exists, update the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If the item does not exist, add it to the cart
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    cart = await cart.populate('items.productId');
    //console.log(cart);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
const deleteItemFromCart= async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
   
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    console.log("backend cart",cart);
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// increasing or decreasing quantity
// Increase item quantity in cart
const increaseItemQuantity = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
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
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
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


// router.get('/:userId', authenticate,    router.post('/', authenticate  router.delete('/:userId/product/:productId', authenticate,