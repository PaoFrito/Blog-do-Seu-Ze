//Express
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PORT = 3000;

//View engine
app.set('view engine', 'ejs');

//Static files
app.use(express.static('public'));

//Data-Base & Models
const connection = require('./model/DAO');
connection.authenticate().
    then(()=>{
        console.log("[ Conected with DB ]");
    }).catch((error)=>{
        console.log("[ ERROR ]"); 
        console.log(error);
});
const ArticleModel = require('./model/ArticleModel');
const CategoryModel = require('./model/CategoryModel');


//Controllers & Routes
const categoriesController = require('./controller/categoriesController');
app.use("/", categoriesController);
const articlesController = require('./controller/articlesController');
app.use("/", articlesController);
//Index route
app.get("/", (req, res)=>{
    ArticleModel.findAll({
        include: [{model: CategoryModel}]
    }).then(articles=>{
        res.render("index",{articles:articles});
    });
});

//Starting local Server
app.listen(PORT, ()=>{
    console.log("[ Porta do Servidor: "+ PORT +" ]");
    console.log("[ Servidor 100% ]");
});
