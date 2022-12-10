const Router = require('express');
const router = new Router();
const PostController = require('../controlers/postController.js');
const AuthMiddleware = require('../middleware/AuthMiddleware.js');

router.get('/', PostController.posts);
router.post('/', AuthMiddleware, PostController.sendPost);
router.get('/:id', PostController.getSinglePost);

module.exports = router