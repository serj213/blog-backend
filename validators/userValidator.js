const { body } = require('express-validator');

const register = [
  body('email', 'Неверный формат почты').isEmail(),
  body('name', 'Имя не может быть менее 2 символов').isLength({ min: 2 }),
  body('password', 'Паспорт не может быть менее 5 символов').isLength({ min: 5 }),
];

const login = [
  body('email', 'Неверный формат почты').isEmail(),
  body('name', 'Имя не может быть менее 2 символов').isLength({ min: 2 }),
];

const update = [
  body('name', 'Имя не может быть менее 2 символов').isString().isLength({ min: 2 }).optional(),
  body('aboutMe').isString().optional(),
];

module.exports = {
  register,
  login,
  update,
};
