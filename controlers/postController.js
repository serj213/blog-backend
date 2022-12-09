const {Post} = require('../models/models.js');

class PostController {
    async posts(req, res){
        const types = await Post.findAll();
        res.status(200).json(types);

    }
    async sendPost(req, res){
        const {title, content } = req.body;
        const postObj = {
            title: title,
            content: content
        }
        const type = await Post.create(postObj)
        res.status(200).json(type)
    }
    async getSinglePost(req, res){
        const {id} = req.params;
        const singlePost = await Post.findOne(
            {
                where:{id},
                // include:[{model:}]
            }
        )

        return res.status(200).json(singlePost)
    }
}

module.exports = new PostController()