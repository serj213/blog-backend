const Router = require('express');
const router = new Router();
const PostController = require('../controlers/postController.js');

router.get('/', PostController.posts);
router.post('/', PostController.sendPost);
router.get('/:id', PostController.getSinglePost);

module.exports = router