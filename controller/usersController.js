const express = require('express');
const router = express.Router();
const UserModel = require('../model/UserModel');
const bcrypt = require('bcryptjs');

router.get("/adm/users", (req,res)=>{

});

router.get("/adm/users/new", (req, res)=>{
    res.render("adm/users/new");
});

router.post("/adm/users/create", (req, res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    UserModel.findOne({where:{email:email}}).then(user=>{
        if(user != undefined)
            res.redirect("/adm/users/new");
        else{
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            if(name != undefined && password != undefined ){
                UserModel.create({
                    name: name,
                    email: email,
                    password: hash
                }).then(()=>res.redirect("/"))
                .catch((error)=>{
                    console.log("[erro ao cadastrar usuario]");
                    console.log(error);
                    res.redirect("/")
                });
            }
        }
    })
}); 

module.exports = router;
