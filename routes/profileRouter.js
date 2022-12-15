const Router = require('express');
const router = new Router();
const ProfileController = require('../controlers/profileController.js');
const userValidator = require('../validators/userValidator.js');
const authMiddleware = require('../middleware/AuthMiddleware.js');

router.put('/edit/:id', [authMiddleware, userValidator.update], ProfileController.editProfile);
router.delete('/:id', authMiddleware, ProfileController.deleteProfile);

module.exports = router;
