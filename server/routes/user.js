const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//create, find, update, delete
router.get('/', userController.view)
router.post('/', userController.find)
router.get('/addUser', userController.form)
router.post('/addUser', userController.create)
router.get('/edituser/:id', userController.edit)

module.exports= router;