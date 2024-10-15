const express = require('express');
const { getProducts, createProduct, updateProduct, getProduct, deleteProduct } = require('../controllers/shopController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Public routes

router.get('/:id',getProduct)
router.get('/', getProducts);

router.post('/create', upload.single('image'), authMiddleware, roleMiddleware('admin'),createProduct)
// , authMiddleware, roleMiddleware('admin'),


router.put('/update/:id', upload.single('image'), authMiddleware, roleMiddleware('admin'), updateProduct);

router.delete('/delete/:id', authMiddleware, roleMiddleware('admin'), deleteProduct);

module.exports = router;