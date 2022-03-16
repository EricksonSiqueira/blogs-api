const { Category, BlogPost, User } = require('../models');
const jwtFuncs = require('../utils/jwt');

const isTitleValid = (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }

  next();
};

const isContentValid = (req, res, next) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }

  next();
};

const isCategoryIdsValid = async (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }

  const categories = await Category.findAll({ where: { id: categoryIds } });

  if (categories.length !== categoryIds.length) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  next();
};

const isCategoryThere = (req, res, next) => {
  const { categoryIds } = req.body;

  if (categoryIds) {
    return res.status(400).json({ message: 'Categories cannot be edited' });
  }

  next();
};

const isUserAuthorized = async (req, res, next) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const { email } = jwtFuncs.validateToken(authorization);

  const post = await BlogPost.findOne({ where: { id } });
  const user = await User.findOne({ where: { email } });

  const postUserId = post.dataValues.userId;
  const tokenUserId = user.dataValues.id;

  if (postUserId !== tokenUserId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

module.exports = {
  isTitleValid,
  isContentValid,
  isCategoryIdsValid,
  isCategoryThere,
  isUserAuthorized,
};
