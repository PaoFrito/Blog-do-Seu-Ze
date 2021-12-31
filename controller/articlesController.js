const express = require('express');
const router = express.Router();
const ArticleModel = require('../model/ArticleModel');
const CategoryModel = require('../model/CategoryModel');
const slugify = require('slugify');

router.get("/adm/article", (req, res)=>{
    ArticleModel.findAll({
        include: [{model: CategoryModel}]
    }).then(article =>{
        res.render("adm/articles/index", {article: article});
    }).catch(error=>{
        console.log(error);
    })
});

router.get("/adm/article/new", (req, res)=>{
    CategoryModel.findAll().then(category =>{
        res.render("adm/articles/new", {category: category});
    });
});

router.post("/adm/article/create", (req, res)=>{
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
    res.redirect("/adm/article");
});

router.post("/adm/article/edit", (req, res)=>{
    var id = req.body.id;

    if(!isNaN(id)){
        ArticleModel.findByPk(id).then(article=>{
            CategoryModel.findAll().then(category=>{
                res.render("adm/articles/edit", {article: article, category: category});
            })
        }).catch(error =>{console.log(error)});
    }
});

router.post("/adm/article/update", (req, res)=>{
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;
    var categoryId = req.body.categoryId;

    if(title != undefined){
        ArticleModel.update({
            title: title,
            slug: slugify(title),
            content: content,
            categoryId: categoryId
        },{where: {id:id}})
        .then(()=>{
            res.redirect("/adm/article");
        })
    }else 
        res.redirect("/adm/article");
});

router.post("/adm/article/delete", (req, res)=>{
    var id = req.body.id;

    if(id != undefined && !isNaN(id)){
        ArticleModel.destroy({
            where: {id: id}
        }).then(()=>{
            res.redirect("/adm/article");
        });
    }
});

module.exports = router;
