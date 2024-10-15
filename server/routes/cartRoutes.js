const express = require('express');
const { getCart, addToCart, deleteItemFromCart, increaseItemQuantity,decreaseItemQuantity } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


const router = express.Router();


router.get('/:userId', authMiddleware,roleMiddleware("user"), getCart);
router.post('/', authMiddleware,roleMiddleware("user"), addToCart);
router.delete('/:userId/product/:productId', authMiddleware, roleMiddleware("user"), deleteItemFromCart);
router.patch('/:userId/product/:productId/increase', authMiddleware, roleMiddleware("user"),increaseItemQuantity);
router.patch('/:userId/product/:productId/decrease', authMiddleware, roleMiddleware("user"),decreaseItemQuantity);

module.exports = router;