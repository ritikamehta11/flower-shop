const express = require('express');
const { getCart, addToCart, deleteItemFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


const router = express.Router();


router.get('/:userId', authMiddleware,roleMiddleware("user"), getCart);
router.post('/', authMiddleware,roleMiddleware("user"), addToCart);
router.delete('/:userId/product/:productId',authMiddleware,roleMiddleware("user"),deleteItemFromCart)

module.exports = router;