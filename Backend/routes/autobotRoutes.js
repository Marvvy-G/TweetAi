const express = require('express');
const router = express.Router();
const apiLimiter = require('../middlewares/rateLimiter');

const {
    getAutobot,
    autobotPosts,
    postComments,
    getAutobotCount
} = require('../controllers/autobotControllers');

router.use(apiLimiter);
// Route definitions
router.get('/autobots', getAutobot);
router.get('/autobots/:id/posts', autobotPosts);
router.get('/posts/:id/comments', postComments);
router.get('/autobots/count', getAutobotCount);

module.exports = router;
