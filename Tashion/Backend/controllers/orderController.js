const Orders = require('../models/Orders');

exports.placeOrder = async (req, res) => {
    try {
        const { user, items, total } = req.body;
        const order = await Orders.create({ user, items, total });
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ msg: "Order placement failed.", error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Orders.find()
            .populate('user')
            .populate('items.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: "Failed to fetch orders.", error: err.message });
    }
};
