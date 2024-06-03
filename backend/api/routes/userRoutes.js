const express=require('express');
const router=express.Router();
const userController=require('../controllers/userControllers')

//for jwt 
//const verifyToken=require('../middleware/verifyToken');
router.get('/',userController.getAllUsers);
router.post('/',userController.createUsers);
router.delete('/:id',userController.deleteUsers);
router.get('/admin/:email',userController.getAdmin);
router.patch('/admin/:id',userController.makeAdmin);
router.put('/:id',userController.updateProfile)
module.exports=router;