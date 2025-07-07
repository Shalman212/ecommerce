const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');  // make sure auth middleware exists

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route for profile
router.get('/profile', auth, getProfile);

module.exports = router;
