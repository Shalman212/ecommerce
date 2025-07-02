const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

exports.createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
};
