const express = require('express');
const router=express.Router();

//authcontroller
const userController=require('../controller/userController');
const { isAdmin, isUser, isLoggedIn} = require('../middleware/authMiddleware')


//getHome
router.get('/', isUser, isLoggedIn,userController.userHome);

module.exports=router;
