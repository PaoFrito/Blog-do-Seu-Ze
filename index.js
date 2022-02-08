//Express
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Session
const session = require('express-session');
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "banana",
    cookie:{
        secure: false,
        maxAge: 1000*60*60*24
    }
}));

//Middlewares
const admAuth = require('./middleware/admAuth');

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
const UserModel = require('./model/UserModel');

//Controllers & Routes
const categoriesController = require('./controller/categoriesController');
app.use("/", categoriesController);
const articlesController = require('./controller/articlesController');
app.use("/", articlesController);
const usersController = require('./controller/usersController');
app.use("/", usersController);


//Index route
app.get("/", (req, res)=>{
    ArticleModel.findAll({
        limit: 5,
        offset: 0
    }).then(articles=>{
        res.render("index",{articles:articles});
    });
});

//ADM route
app.get("/adm", admAuth, (req,res)=>{
    res.render("adm/index",{user: req.session.user});
});

//Starting local Server
app.listen(PORT, ()=>{
    console.log(`[ Porta do Servidor: ${PORT} ]`);
    console.log("[ Servidor 100% ]");
});