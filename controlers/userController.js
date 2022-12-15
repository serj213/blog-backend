const ApiError = require('../error/apiError');
const { Person, Post } = require('../models/models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateToken = (tokenData) => {
  const { id, name, email, avatar, aboutMe, postsUser } = tokenData;
  return jwt.sign({ id, name, email, avatar, aboutMe, postsUser }, process.env.SECKRET_KEY, { expiresIn: '24h' });
};
class UserController {
  async registration(req, res, next) {
    try {
      const { name, password, email } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
      const candidat = await Person.findOne({
        where: { email },
      });
      if (candidat) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'));
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const personObj = { name, email, password: hashPassword, avatar: null, aboutMe: null };
      const person = await Person.create(personObj);

      const token = generateToken({ id: person.id, name, email, avatar: person.avata, aboutMe: person.aboutMe });
      const user = {
        id: person.id,
        name,
        email,
        avatar: person.avatar,
        aboutMe: person.aboutMe,
        userPosts: [],
      };
      res.status(200).json({ user, token });
    } catch (error) {
      console.log('error registration', error);
      next(ApiError.badRequest(error));
    }
  }
  async login(req, res, next) {
    try {
      const { password, email } = req.body;
      const user = await Person.findOne({ where: { email } });

      if (!user) {
        return next(ApiError.internal('Пользователь не найден'));
      }

      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal('Неверный пароль'));
      }

      const postsUser = await Post.findAll({ where: { userId: user.id } });
      const userObj = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        aboutMe: user.aboutMe,
        userPosts: postsUser,
      };
      const token = generateToken(userObj);
      res.json({ user: userObj, token });
    } catch (error) {
      console.log('Ошибка при логировании ', error);
    }
  }
  async auth(req, res, next) {
    const { id, name, email, avatar, aboutMe } = req.user;
    const postsUser = await Person.findAll({ where: { userId: user.id } });

    const userObj = { id, name, email, avatar, aboutMe, postsUser: postsUser };
    const token = generateToken(userObj);
    return res.json({ user: userObj, token });
  }
}

module.exports = new UserController();
