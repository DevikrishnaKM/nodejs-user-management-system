const express = require('express');
const router=express.Router();

//authcontroller
const authController=require('../controller/authController');
const { userRegisterValidationRules, validate } = require('../middleware/validationMiddleware');
const { isAdmin, isUser, isLoggedIn} = require('../middleware/authMiddleware')

//user

router.get('/login', authController.getUserLogin);
router.get('/register',authController.getUserRegister);

router.get('/login', authController.userLogin);
router.post('/register', authController.userRegister);


//admin
router.get('/admin/login', authController.getAdminLogin);
router.get('/admin/register', authController.getAdminRegister);

router.post('/admin/login', authController.adminLogin)
router.post('/admin/register', authController.adminRegister)


module.exports=router;