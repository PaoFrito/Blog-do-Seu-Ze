const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Categorias");
});

router.get("/adm", (req, res)=>{
    res.send("adm page for categories");
});

module.exports = router;