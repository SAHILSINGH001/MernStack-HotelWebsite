const express = require('express');
const Menu = require('../model/Menu');
const router = express.Router();
const menuController=require('../controllers/menuControllers')
// Get all menu items from the database
router.get('/', menuController.getAllMenuItems);
router.post('/', menuController.postMenuItem);
router.delete('/:id', menuController.deleteMenuItem);
router.get('/:id', menuController.getSingleMenuItem);
router.put('/:id',menuController.UpdateMenuItems)
module.exports = router;
