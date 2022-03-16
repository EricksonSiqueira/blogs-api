const express = require('express');

const router = express.Router();

const tokenValidator = require('../middlewares/tokenValidation');
const postController = require('../controllers/postController');
const validator = require('../middlewares/postValidations');

router.post('/', 
  tokenValidator.isTokenValid,
  validator.isCategoryIdsValid,
  validator.isContentValid,
  validator.isTitleValid,
  postController.post);

router.get('/',
  tokenValidator.isTokenValid,
  postController.getAll);

router.get('/:id',
  tokenValidator.isTokenValid,
  postController.getById);

module.exports = router;
