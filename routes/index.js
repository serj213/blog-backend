const Router = require('express');
const userRouter = require('./userRouter.js');
const postRouter = require('./postRouter.js');

const router = new Router();

router.use('/user', userRouter);
router.use('/post', postRouter)

module.exports = router