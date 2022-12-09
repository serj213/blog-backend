const Router = require('express');
const router = new Router();
const userControler = require('../controlers/userController.js');
const authMiddleware = require('../middleware/AuthMiddleware.js');

router.post('/registration', userControler.registration);
router.post('/login', userControler.login);
router.get('/auth', authMiddleware, userControler.auth);

module.exports = router