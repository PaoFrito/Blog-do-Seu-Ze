const express = require('express');
const router = express.Router();
const ArticleModel = require('../model/ArticleModel');
const CategoryModel = require('../model/CategoryModel');
const slugify = require('slugify');

router.get("/adm/articles", (req, res)=>{
    res.send("articles");
});

router.get("/adm/articles/new", (req, res)=>{
    CategoryModel.findAll().then(category =>{
        res.render("adm/articles/new", {category: category});
    });
});

router.post("/adm/articles/create", (req, res)=>{
    var title = req.body.title;
    var content = req.body.content;
    var categoryId = req.body.categoryId;

    if(title != undefined){
        ArticleModel.create({
            title: title,
            slug: slugify(title),
            content: content,
            categoryId: categoryId
        });
    }
    res.redirect("/adm/articles");
});



module.exports = router;