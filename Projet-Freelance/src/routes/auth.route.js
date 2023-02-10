const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const { checkAuth, checkRegister, validation} = require('../middlewares/validators.js');

router.post('/registerCompany', checkRegister, validation, authController.registerCompany);
router.post('/registerFreelance', checkRegister, validation, authController.registerFreelance);
router.post('/login', checkAuth, validation, authController.login);

module.exports = router;