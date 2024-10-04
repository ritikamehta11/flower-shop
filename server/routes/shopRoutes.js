const express = require('express');
const { getProducts, createProduct } = require('../controllers/shopController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Public routes
router.get('/', getProducts);

router.post('/create', authMiddleware, roleMiddleware('admin'), createProduct)
// , authMiddleware, roleMiddleware('admin'),


module.exports = router;