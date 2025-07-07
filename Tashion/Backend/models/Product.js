const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: [String],      // store URLs or filenames
    category: String,
    subCategory: String,
    sizes: [String],
    bestseller: Boolean,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
