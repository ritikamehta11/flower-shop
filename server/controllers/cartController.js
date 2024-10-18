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
const Cart = require('../models/Cart'); // Adjust the path as needed

const removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Find the cart by userId and remove the item with the matching productId
    const cart = await Cart.updateOne(
      { userId: userId }, // Find the cart by userId
      { $pull: { items: { productId: productId } } } // Remove the item with the matching productId
    );

    // Check if the cart was updated (i.e., item was removed)
    if (cart.nModified === 0) {
      return res.status(404).json({ msg: 'No matching cart or product found' });
    }

    return res.status(200).json({ msg: 'Item removed from the cart successfully' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return res.status(500).json({ msg: 'Server error' });
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