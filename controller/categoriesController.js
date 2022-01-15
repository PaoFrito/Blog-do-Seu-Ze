const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const CategoryModel = require('../model/CategoryModel');
const ArticleModel = require('../model/ArticleModel')

router.get("/adm/categories", (req, res)=>{
    CategoryModel.findAll().then(categories =>{
        res.render("adm/categories/index", {category:categories});
    });
});

router.get("/categories", (req,res)=>{
    CategoryModel.findAll().then(categories =>{
        res.render("pages/categories", {category:categories});
    });
});

router.get("/categories/:slug", (req,res)=>{
    var slug = req.params.slug;
    CategoryModel.findOne({
        where: {slug: slug},
        include: [{model: ArticleModel}]
    }).then(category=>{
        res.render("pages/category", {category: category})
    }).catch(error=>{
        console.log(error);
    })
});

router.get("/adm/categories/new", (req, res)=>{
    res.render("adm/categories/new");
});

router.post("/adm/categories/create", (req, res)=>{
    var name = req.body.name;

    if(name != undefined){
        CategoryModel.create({
            name: name,
            slug: slugify(name)
        });
    }
    res.redirect("/adm/categories");
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

router.post("/adm/categories/edit", (req, res)=>{
    var id = req.body.id;

    if(!isNaN(id)){
        CategoryModel.findByPk(id).then(category =>{
            res.render("adm/categories/edit", {category:category}); 
        }).catch(error =>{
            console.log(error)
            res.redirect("/adm/categories");
        });
    }else{
        res.redirect("/adm/categories");
    }
});

router.post("/adm/categories/update", (req, res)=>{
    var id = req.body.id;
    var name = req. body.name;

    if(name != undefined){
        CategoryModel.update({
            name: name,
            slug: slugify(name)
        },{
            where: {id: id}
        }).then(()=>{
            res.redirect("/adm/categories");
        })
    }
});

module.exports = router;