const express = require('express');
const router = express.Router();

router.get("/adm/categories/new", (req, res)=>{
    res.render("../views/adm/categories/new");
});

module.exports = router;