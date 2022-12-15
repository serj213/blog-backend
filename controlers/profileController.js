const ApiError = require('../error/apiError');
const { Person } = require('../models/models');
const { Post } = require('../models/models.js');
const { validationResult } = require('express-validator');
const { badRequest } = require('../error/apiError');
const jwt = require('jsonwebtoken');

const generateToken = (tokenData) => {
  const { id, name, email, avatar, aboutMe, postsUser } = tokenData;
  return jwt.sign({ id, name, email, avatar, aboutMe, postsUser }, process.env.SECKRET_KEY, { expiresIn: '24h' });
};

class ProfileController {
  async editProfile(req, res, next) {
    try {
      const { id } = req.params;
      const { name, aboutMe } = req.body;

      const errors = validationResult(req);

      console.log('errors ', errors);

      if (!errors.isEmpty()) {
        return res.status(500).json(errors.array());
      }

      const personById = await Person.findOne({
        where: { id },
      });

      if (!personById) {
        return next(ApiError.badRequest('Пользователь не найден'));
      }

      if (name) personById.name = name;
      if (aboutMe) personById.aboutMe = aboutMe;

      const updatePerson = await personById.save();
      if (!updatePerson) {
        return next(ApiError.internal('Не удалось обновить пользователя'));
      }

      const postsUser = await Post.findAll({
        where: {
          userId: updatePerson.id,
        },
      });

      const editedData = {
        id: updatePerson.id,
        name: updatePerson.name,
        email: updatePerson.email,
        aboutMe: updatePerson.aboutMe,
        postsUser: postsUser,
      };
      const token = generateToken(editedData);


      return res.status(200).send({
        user: editedData,
        token
      });
    } catch (error) {
      console.log('Ошибка при редактировании профиля');
      return next(ApiError.internal(error.message));
    }
  }

  async deleteProfile(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return next(ApiError.badRequest('Укажите id пользователя'));
      }

      if (+id !== +req.user.id) {
        return next(ApiError.internal('Вы можете удалить только своего пользователя'));
      }

      const personByid = await Person.findOne({
        where: { id },
      });

      if (!personByid) {
        return next(ApiError.badRequest('Пользователь не найден'));
      }

      const personDestroy = personByid.destroy();
      if (!personDestroy) {
        return next(ApiError.badRequest('Не удалось удалить пользователя'));
      }

      return res.status(200).send({
        message: 'Пользователь был успешно удален',
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  }
}

module.exports = new ProfileController();
