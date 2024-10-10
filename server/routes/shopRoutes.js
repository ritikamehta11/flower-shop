const express = require('express');
const { getProducts, createProduct, updateProduct, getProduct } = require('../controllers/shopController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Public routes

router.get('/:id',getProduct)
router.get('/', getProducts);

router.post('/create',  authMiddleware, roleMiddleware('admin'),createProduct)
// , authMiddleware, roleMiddleware('admin'),


router.put('/update/:id', authMiddleware, roleMiddleware('admin'), updateProduct);

module.exports = router;