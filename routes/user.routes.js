const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const validator = require('../middlewares/userValidations');
const tokenValidator = require('../middlewares/tokenValidation');

router.post('/',
  validator.isDisplayNameValid,
  validator.isEmailValid,
  validator.isPasswordValid,
  userController.post);

router.get('/', 
  tokenValidator.isTokenValid,
  userController.getAll);

module.exports = router;