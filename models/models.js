const sequelize = require('../db.js');
const {DataTypes} = require('sequelize')

const Person = sequelize.define('person', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, allowNull:false},
    email:{type:DataTypes.STRING, unique:true},
    password:{type:DataTypes.STRING, allowNull:false}
})

const Post = sequelize.define('post', {
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title:{type:DataTypes.TEXT, allowNull:false},
    content:{type:DataTypes.STRING(255), allowNull:false},
    img:{type:DataTypes.STRING, allowNull:false},
    category:{ type:DataTypes.STRING,allowNull: false}, 
    userId:{type:DataTypes.INTEGER}
})

Person.hasMany(Post);
Post.belongsTo(Person);

module.exports = {
    Person,
    Post
}