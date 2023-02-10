const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken.js');
const verifyAdmin = require('../middlewares/verifyAdmin.js');
const userController = require('../controllers/user.controller.js');

router.get('/', verifyToken, verifyAdmin, userController.getAllUsersAdmin);
router.get('/:id', verifyToken, verifyAdmin, userController.getUserAdmin);
router.put('/:id', verifyToken, verifyAdmin, userController.updateUserAdmin);
router.delete('/:id', verifyToken, verifyAdmin, userController.deleteUserAdmin);
router.put('/updateUserProfile/', verifyToken, userController.updateUserProfile);

module.exports = router;


