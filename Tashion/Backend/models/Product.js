const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    images: [String],
    sizes: [String],
    stock: Number,
    description: String,
    category: String,
    subCategory: String
}, { timestamps: true });
module.exports = mongoose.model('Product', ProductSchema);
