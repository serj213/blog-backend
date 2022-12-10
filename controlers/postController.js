const { Post } = require('../models/models.js');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/apiError.js');

class PostController {
  async posts(req, res) {
    const types = await Post.findAll();
    res.status(200).json(types);
  }
  async sendPost(req, res, next) {
    try {
      const { title, content, category } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const postObj = {
        title: title,
        content: content,
        category: category,
        img: fileName,
        userId:req.user.id
      };
      const type = await Post.create(postObj);
      postObj.id = type.id
      res.status(200).json(postObj);
    } catch (error) {
      next(ApiError.badRequest('Ошибка при отправке поста ', error.message));
    }
  }

  async getSinglePost(req, res) {
    const { id } = req.params;
    const singlePost = await Post.findOne({
      where: { id },
      // include:[{model:}]
    });

    return res.status(200).json(singlePost);
  }
}

module.exports = new PostController();
