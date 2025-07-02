const Order = require('../models/Orders');  // Correct path with 'Orders.js'


exports.placeOrder = async (req, res) => {
    const { user, items, total } = req.body;
    const order = await Order.create({ user, items, total });
    res.status(201).json(order);
};

exports.getOrders = async (req, res) => {
    const orders = await Order.find().populate('user').populate('items.product');
    res.json(orders);
};
