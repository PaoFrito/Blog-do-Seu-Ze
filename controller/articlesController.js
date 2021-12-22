const express = require('express');
const router = express.Router();
const ArticleModel = require('../model/ArticleModel');
const slugify = require('slugify');

router.get("/adm/articles", (req, res)=>{
    res.send("articles");
});

router.get("/adm/articles/new", (req, res)=>{
    res.render("adm/articles/new");
});

router.post("/adm/articles/create", (req, res)=>{
    var title = req.body.title;
    var content = req.body.content;

    if(title != undefined){
        ArticleModel.create({
            title: title,
            slug: slugify(title),
            content: content
        });
    }
    res.redirect("/adm/articles");
});



module.exports = router;