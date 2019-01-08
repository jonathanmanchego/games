const router =  require('express').Router();

router.get('/profile',(req,res)=>{
    res.send('Hola mi Perfil');
});

module.exports = router;