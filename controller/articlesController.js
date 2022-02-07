const express = require('express');
const router = express.Router();
const ArticleModel = require('../model/ArticleModel');
const CategoryModel = require('../model/CategoryModel');
const slugify = require('slugify');

router.get("/article/:slug", (req,res)=>{
    ArticleModel.findOne({ 
        where: { slug: req.params.slug },
        include: [{model:CategoryModel}]
    }).then(article=>{
        res.render("pages/article", {article: article});
    }).catch(error=>{
        console.log(error);
    });
});

router.get("/article/page/:num", (req, res)=>{
    if(isNaN(req.params.num))
        res.redirect("/");
    else{
        let num = req.params.num;
        let offset = num*5;
        let limit = 5;

        ArticleModel.findAndCountAll({
            limit: limit,
            offset: offset
        }).then(articles=>{
            let pos;
            if(offset == 0){
                pos = 0;
            }else if(offset > 0 && offset+limit < articles.count){
                pos = 1;
            }else if(offset > articles.count){
                res.redirect("/");
            }else{
                pos = 2;
            }

            let resul = {
                num: num,
                pos: pos,
                articles: articles
            }

            res.render("pages/articlePages", {resul:resul});
        });
    }
});

router.get("/adm/article", (req, res)=>{
    ArticleModel.findAll({
        include: [CategoryModel]
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
