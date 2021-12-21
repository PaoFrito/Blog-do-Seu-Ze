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

module.exports = router;