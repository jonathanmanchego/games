const router = require('express').Router();
router.get('/',(req,res)=>{
    res.render('index');
});
router.get("/juegos/ajedrez",(req,res)=>{
    res.render('juegos/ajedrez',{
        titulo: 'AJEDREZ'
    });
});
module.exports =  router;