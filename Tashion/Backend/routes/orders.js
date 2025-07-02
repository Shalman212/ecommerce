const express = require('express');
const router = express.Router();
const { placeOrder, getOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', auth, placeOrder);
router.get('/', auth, admin, getOrders); // Only admin can view all orders

module.exports = router;
