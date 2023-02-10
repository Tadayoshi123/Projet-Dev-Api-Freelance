const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken.js');
const verifyAdmin = require('../middlewares/verifyAdmin.js');
const {verifyTypeUserCompany,verifyTypeUserFreelance} = require('../middlewares/verifyTypeUser.js');
const missionController = require('../controllers/mission.controller.js');

router.get('/', verifyToken, verifyAdmin, missionController.getAllMissions);
router.post('/', verifyToken, verifyTypeUserCompany, missionController.createMission);
router.get('/:id', verifyToken, verifyAdmin, missionController.getMission);
router.put('/:id', verifyToken, verifyTypeUserCompany, missionController.updateMission);
router.delete('/:id', verifyToken, verifyTypeUserCompany, missionController.deleteMission);

module.exports = router;