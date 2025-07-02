const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct } = require('../controllers/productController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', getAllProducts);
router.post('/', auth, admin, createProduct); // Only admin can add products

module.exports = router;
