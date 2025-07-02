const User = require('../models/User');

exports.getProfile = async (req, res) => {
    const user = await User.findById(req.user.userId).select('-passwordHash');
    res.json(user);
};
