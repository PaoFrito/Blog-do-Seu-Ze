const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const CategoryModel = require('../model/CategoryModel');

router.get("/adm/categories", (req, res)=>{

    CategoryModel.findAll().then(categories =>{
        res.render("../views/adm/categories/index", {category:categories});
    });
});

router.get("/adm/categories/new", (req, res)=>{
    res.render("../views/adm/categories/new");
});

router.post("/adm/categories/save", (req, res)=>{
    var name = req.body.name;

    if(name != undefined){
        CategoryModel.create({
            name: name,
            slug: slugify(name)
        }).then(()=>{
            res.redirect()
        })
    }

    res.redirect("/adm/categories/new");
});

router.post("/adm/categories/delete", (req, res)=>{
    var id = req.body.id;
    if(id != undefined && !isNaN(id)){
        CategoryModel.destroy({
            where: {id:id}
        });
    }
    res.redirect("/adm/categories");
});

router.post("/adm/categories/upDate", (req, res)=>{
    var id = req.body.id;
    /* if(id != undefined && !isNaN(id)){
        CategoryModel.({
            where: {id:id}
        });
    } */
    res.redirect("/adm/categories");
});
module.exports = router;