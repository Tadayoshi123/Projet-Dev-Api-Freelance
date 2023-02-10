const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken.js');
const verifyAdmin = require('../middlewares/verifyAdmin.js');
const jobController = require('../controllers/job.controller.js');

router.get('/', verifyToken, verifyAdmin, jobController.getAllJobs);
router.post('/', verifyToken, verifyAdmin, jobController.createJob);
router.get('/:id', verifyToken, verifyAdmin, jobController.getJob);
router.put('/:id', verifyToken, verifyAdmin, jobController.updateJob);
router.delete('/:id', verifyToken, verifyAdmin, jobController.deleteJob);

module.exports = router;