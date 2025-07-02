const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        email = email.toLowerCase();

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "Email already registered." });

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, passwordHash });
        res.status(201).json({ msg: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ msg: "Registration failed.", error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid email or password." });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ msg: "Invalid email or password." });

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ msg: "Login failed.", error: err.message });
    }
};
