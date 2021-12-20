const Sequelize = require('sequelize');
const connection = require('./DAO');

const Article = connection.define(
    //table name
    'articles',{
    //atributes
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Article;