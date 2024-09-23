const express = require("express");
const { login, register, updatePassword, getUserProfile, updateUserProfile } = require("../controllers/authController"); // Adjust the path as necessary

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update-password', updatePassword);
router.get('/user-profile', getUserProfile);
router.put('/user-profile', updateUserProfile);

module.exports = router;
