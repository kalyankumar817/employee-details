const express=require('express')
const employeeController=require('../controllers/employeeController')
const userController=require('../controllers/userController')
const router=express.Router()

//creating requests
router.post('/post',userController.verifyUser,employeeController.createEmployee)
router.get('/getall',userController.verifyUser,employeeController.getAll)
router.get('/get/:id',userController.verifyUser,employeeController.getById)
router.put('/update/:id',userController.verifyUser,employeeController.updateEmployee)
router.delete('/delete/:id',userController.verifyUser,employeeController.deleteEmployee)

module.exports=router;