const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        size: String,
        quantity: Number,
        price: Number
    }],
    total: Number,
    status: { type: String, default: 'Processing' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Orders', OrdersSchema);
