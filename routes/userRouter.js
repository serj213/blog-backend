const Router = require('express');
const router = new Router();
const userControler = require('../controlers/userController.js');

router.post('/registration', userControler.registration);
router.post('/login', userControler.login);
router.get('/auth', userControler.auth);

module.exports = router