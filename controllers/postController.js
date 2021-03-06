const { BlogPost, User, PostCategory, Category } = require('../models');
const jwtFuncs = require('../utils/jwt');

const post = async (req, res, _next) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;

  try {
    const { email } = jwtFuncs.validateToken(authorization);

    const user = await User.findOne({ where: { email } });

    const { id } = await BlogPost
      .create({ title, content, userId: user.id });
    
    const categoriesToCreate = [];

    categoryIds.forEach((categoryId) => {
      categoriesToCreate.push({ postId: id, categoryId });
    });

    await PostCategory.bulkCreate(categoriesToCreate);
    
    const postReturn = { id, title, content, userId: user.id };

    return res.status(201).json(postReturn);
  } catch (error) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getAll = async (req, res, _next) => {
  try {
    const posts = await BlogPost.findAll(
      { 
        include: [
          { model: User, as: 'user' },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      },
      );

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  try {
    const foundPost = await BlogPost.findOne(
      {
        where: { id },
        include: [
          { model: User, as: 'user' },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      },
    );

    if (!foundPost) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(foundPost);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const update = async (req, res, _next) => {
  const { title, content } = req.body;
  const { id } = req.params;

  try {
    await BlogPost.update({ title, content }, { where: { id } });

    const { categories, userId } = await BlogPost.findOne({
      where: { id },
      include: { model: Category, as: 'categories', through: { attributes: [] } },
    });

    return res.status(200).json({ title, content, userId, categories });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  post,
  getAll,
  getById,
  update,
};
