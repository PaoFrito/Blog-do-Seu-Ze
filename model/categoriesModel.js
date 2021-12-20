const Sequelize = require('sequelize');
const connection = require('./DAO');

const Category = connection.define(
    //table name
    'categories',{
    //atributes
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Category;