const Router = require('express');
const router = new Router();
const userControler = require('../controlers/userController.js');
const authMiddleware = require('../middleware/AuthMiddleware.js');
const userValidator = require('../validators/userValidator.js');

router.post('/registration', userValidator, userControler.registration);
router.post('/login', userControler.login);
router.get('/auth', authMiddleware, userControler.auth);

module.exports = router