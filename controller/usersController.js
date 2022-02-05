const express = require('express');
const User = require('../model/UserModel');
const router = express.Router();
const UserModel = require('../model/UserModel');

router.get("/adm/users", (req,res)=>{

});

router.get("/adm/users/new", (req, res)=>{
    res.render("adm/users/new");
});

router.post("/adm/users/create", (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    if(name != undefined && password != undefined ){
        UserModel.create({
            name: name,
            email: email,
            password: password
        }).then(res.redirect("/adm/users"));
    }
    res.redirect("/adm/users")
});

module.exports = router;
