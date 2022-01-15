const Sequelize = require('sequelize');
const connection = require('./DAO');

const User = connection.define(
    //table name
    'User',{
    //atributes
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },email:{
        type: Sequelize.STRING,
        allowNull: false
    },password:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//User.sync({force: true});

module.exports = User;