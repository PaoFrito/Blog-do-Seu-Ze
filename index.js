const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Data Base & Models
const connection = require('./model/DAO');
connection.authenticate().
    then(()=>{
        console.log("[ Conected with DB ]");
    }).catch((error)=>{
        console.log("[ ERROR ]"); 
        console.log(error);
});

//View engine
app.set('view engine', 'ejs');

//Static files
app.use(express.static('public'));

//Inicial Page
app.get("/", (req, res)=>{
    res.render("index");
});

//Starting local Server
class Server{
    constructor(port){
        this.port;
    }
}
const server = new Server();
server.port = 3000;
app.listen(server.port, ()=>{
    console.log("[ Porta do Servidor: "+ server.port +" ]");
    console.log("[ Servidor 100% ]");
});