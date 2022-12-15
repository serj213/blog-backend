const Router = require('express');
const userRouter = require('./userRouter.js');
const postRouter = require('./postRouter.js');
const profileRouter = require('./profileRouter.js');
const authMiddleware = require('../middleware/AuthMiddleware.js');

const router = new Router();

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/profile', profileRouter);

module.exports = router;
