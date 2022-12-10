const { body } = require('express-validator');


module.exports = [
    body('email', 'Неверный формат почты').isEmail(),
    body('name', 'Имя не может быть менее 2 символов').isLength({min:2}),
    body('password', 'Паспорт не может быть менее 5 символов').isLength({min:5})
]
