const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const validator = require('../middlewares/userValidations');

router.post('/',
  validator.isDisplayNameValid,
  validator.isEmailValid,
  validator.isPasswordValid,
  userController.post);

module.exports = router;