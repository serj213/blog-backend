const ApiError = require('../error/apiError');
const {Person} = require('../models/models.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const generateToken = (id, name,email, ) => {
    console.log('id user ', id);
   return jwt.sign({id:id, name, email}, process.env.SECKRET_KEY, {expiresIn:'24h'});
}
class UserController {
    async registration(req, res, next){
       try {
        const {name, password, email} = req.body;

        const errors = validationResult(req);
        console.log('error registr ', errors);
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array());
        }
        const candidat = await Person.findOne(
            {
                where:{email}
            }
            );
        if(candidat){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const person = await Person.create({name, email, password: hashPassword});
       
        const token = generateToken(person.id, name, email)
        res.status(200).json({token})
       } catch (error) {
        console.log('error registration', error);
        next(ApiError.badRequest(error))
       }
    }
    async login(req, res, next){
        try {   
            const {password, email} = req.body;
            const user = await Person.findOne({where:{email}});

            if(!user){
                return next(ApiError.internal('Пользователь не найден'))
            }

            const comparePassword = bcrypt.compareSync(password, user.password);
            if(!comparePassword){
                return next(ApiError.internal('Неверный пароль'))
            }

            const token = generateToken(user.id, user.name, user.email)
            res.json({user, token})
           
        } catch (error) {
            console.log('Ошибка при логировании ', error);
        }

    }
    async auth(req, res, next){
        const {id, name, email} = req.user
        const userObj = {id, name, email}
        const token = generateToken(id, name, email )
        return  res.json({user:userObj, token})
    }
}

module.exports = new UserController()