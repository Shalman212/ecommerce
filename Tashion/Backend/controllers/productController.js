const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ date: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: "Failed to fetch products.", error: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller, image } = req.body;

        if (!name || !description || !price || !category || !subCategory || !sizes || sizes.length === 0) {
            return res.status(400).json({ msg: "Please fill in all required fields." });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller: !!bestseller,
            image: image || [],
            date: Date.now()
        });

        res.status(201).json({ msg: "Product created successfully!", product });
    } catch (err) {
        res.status(500).json({ msg: "Failed to create product.", error: err.message });
    }
};
