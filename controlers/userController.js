const ApiError = require('../error/apiError');

class UserController {
    async registration(req, res){

    }
    async login(req, res){

    }
    async auth(req, res, next){
        const {id} = req.query;
        if(!id){
            return next(ApiError.badRequest('Не задан ID'))
        }
        res.json(id)
        // res.status(200).json({message:'success'})
    }
}

module.exports = new UserController()