const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/user/email-verification
router.post('/email-verification', userController.emailVerification);
// GET /api/user/login
router.post('/login', userController.userLogin);
// GET /api/user/sign-up
router.post('/sign-up', userController.userSignUp);

module.exports = router;

