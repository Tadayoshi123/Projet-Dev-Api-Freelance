const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken.js');
const verifyAdmin = require('../middlewares/verifyAdmin.js');
const skillController = require('../controllers/skill.controller.js');

router.get('/', verifyToken, verifyAdmin, skillController.getAllSkills);
router.post('/', verifyToken, verifyAdmin, skillController.createSkill);
router.get('/:id', verifyToken, verifyAdmin, skillController.getSkill);
router.put('/:id', verifyToken, verifyAdmin, skillController.updateSkill);
router.delete('/:id', verifyToken, verifyAdmin, skillController.deleteSkill);

module.exports = router;