const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categoriesController');
const validator = require('../middlewares/categoriesValidations');
const tokenValidator = require('../middlewares/tokenValidation');

router.post('/', 
  tokenValidator.isTokenValid,
  validator.isNameValid,
  categoriesController.post);

router.get('/',
  tokenValidator.isTokenValid,
  categoriesController.getAll);

module.exports = router;
