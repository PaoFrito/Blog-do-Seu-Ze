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
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync({force: false});

module.exports = User;