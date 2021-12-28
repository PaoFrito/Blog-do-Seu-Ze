const Sequelize = require('sequelize');
const connection = require('./DAO');
const CategoryModel = require('./CategoryModel');

const Article = connection.define(
    //table name
    'articles',{
    //atributes
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    },content:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

CategoryModel.hasMany(Article);
Article.belongsTo(CategoryModel);

Article.sync({force: true});

module.exports = Article;