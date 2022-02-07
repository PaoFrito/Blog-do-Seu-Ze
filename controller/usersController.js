const express = require('express');
const router = express.Router();
const UserModel = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const admAuth = require('../middleware/admAuth');

router.get("/adm/users", admAuth, (req,res)=>{
    UserModel.findAll().then(users=>{
        res.render("adm/users/index", {users:users});
    })
})

router.get("/adm/users/login",  (req,res)=>{
    res.render("adm/users/login");
    
});

router.post("/adm/users/authenticate", (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    
    UserModel.findOne({where:{email:email}}).then(
        user=>{
            if(user != undefined){
                if(bcrypt.compareSync(password, user.password)){
                    req.session.user = {
                        id: user.id,
                        email: user.email
                    }
                }else{
                    res.redirect("/");
                }
            }else{
                res.redirect("/");
            }
        }
    ).then(()=>{res.redirect("/adm")})
});

router.get("/adm/users/signup", admAuth, (req, res)=>{
    res.render("adm/users/new");
});

router.post("/adm/users/create", admAuth, (req, res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    UserModel.findOne({where:{email:email}}).then(user=>{
        if(user != undefined)
            res.redirect("/adm/users/new");
        else{
            if(name != undefined && password != undefined ){
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt);
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
    });
}); 

router.post("/adm/users/delete", admAuth, (req,res)=>{
    let id = req.body.id;

    if(id != undefined && !isNaN(id)){
        UserModel.destroy({
            where: {id:id}
        });
    }
    res.redirect("/adm");
});

router.post("/adm/users/edit", admAuth, (req,res)=>{
    let id = req.body.id;

    UserModel.findOne({where:{id:id}}).then(user=>{
        res.render("adm/users/edit",{user:user});
    }).catch(error=>{
        console.log(error);
    });
})

router.post("/adm/users/update", admAuth, (req,res)=>{
    let id = req.body.id;
    let name = req. body.name;
    let email = req.body.email;
    let oldEmail = req.body.oldEmail;
    let password = req.body.password;

    if(!isNaN(id) && id != undefined && name != undefined && email != undefined && password != undefined && oldEmail != undefined)
        res.redirect("/adm/users/login");
    else{
        UserModel.findOne({where:{email:oldEmail}}).then(users=>{
            if(users != undefined)
                res.redirect("/adm/users/login")
            else{
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt);
                UserModel.update({
                    name: name,
                    email: email,
                    password: hash
                },{where:{id:id}}).then(()=>{res.redirect("/adm/users")})
                .catch(error=>{console.log(error)});
            }
        }).catch(error=>{console.log(error)});
    }
});

module.exports = router;
