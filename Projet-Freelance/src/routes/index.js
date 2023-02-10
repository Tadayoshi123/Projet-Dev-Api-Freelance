const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const skillRouter = require('./skill.route');
const jobRouter = require('./job.route');
const missionRouter = require('./mission.route');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/skill', skillRouter);
router.use('/job', jobRouter);
router.use('/mission', missionRouter);


module.exports = router;