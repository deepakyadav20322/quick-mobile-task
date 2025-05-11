const express=require('express');
const { handleLogin } = require('../controllers/userController');
const router=express.Router();

router.post("/",handleLogin);

module.exports=router;