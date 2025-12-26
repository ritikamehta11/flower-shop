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

const addToCart = async (req, res) => {
  const { userId, pid, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart) {
      // Create new cart with the item
      cart = new Cart({
        userId,
        items: [{ product: pid, quantity }],
      });
    } else {
      // Cart exists, check if item already in cart
      const existingItemIndex = cart.items.findIndex(
        (item) => item.product._id.toString() === pid
      );

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Item doesn't exist, add it
        cart.items.push({ product: pid, quantity });
      }
    }

    await cart.save();
    cart = await Cart.findOne({ userId }).populate("items.product");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Increase item quantity
const increaseItemQuantity = async (req, res) => {
  const { userId, pid } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const existingItem = cart.items.find(item => item.product._id.toString() === pid);
    if (existingItem) {
      existingItem.quantity += 1;
      await cart.save();
      
      // ✅ Re-fetch with populated data
      const populatedCart = await Cart.findOne({ userId }).populate('items.product');
      res.json(populatedCart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Decrease item quantity
const decreaseItemQuantity = async (req, res) => {
  const { userId, pid } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const existingItem = cart.items.find(item => item.product._id.toString() === pid);
    if (existingItem) {
      existingItem.quantity -= 1;
      
      // ✅ Remove item if quantity reaches 0
      if (existingItem.quantity <= 0) {
        cart.items = cart.items.filter(item => item.product._id.toString() !== pid);
      }
      
      await cart.save();
      
      // ✅ Re-fetch with populated data
      const populatedCart = await Cart.findOne({ userId }).populate('items.product');
      res.json(populatedCart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete item from cart
const deleteItemFromCart = async (req, res) => {
  try {
    const { userId, pid } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    const itemToRemove = cart.items.find(item => item.product._id.toString() === pid);
    
    if (!itemToRemove) {
      return res.status(404).json({ msg: 'Item not found in cart' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemToRemove._id.toString());

    await cart.save();

    // ✅ Re-fetch with populated data
    const populatedCart = await Cart.findOne({ userId }).populate('items.product');
    return res.json(populatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};
module.exports = {
  getCart,
  addToCart,
  deleteItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity
};