const express = require('express')
const router = express.Router()

// Admin Controller
const adminController = require('../controller/adminController')
const { isAdmin, isAdminLoggedIn} = require('../middleware/authMiddleware')

router.get('/', isAdmin, isAdminLoggedIn, adminController.getDashboard)
router.get('/view/:id',  isAdminLoggedIn, adminController.viewUser);
router.get('/edit/:id',  isAdminLoggedIn, adminController.editUser);
router.put('/edit/:id',adminController.editPost);
router.delete('/edit/:id',adminController.deleteUser);



module.exports = router