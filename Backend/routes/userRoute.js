const express=require('express')
const userController=require('../controllers/userController')
const router=express.Router()

router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)
router.post('/logout',userController.logout)
router.get('/dashboard',userController.verifyUser,userController.dashboard)

module.exports=router