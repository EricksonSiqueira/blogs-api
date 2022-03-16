const { BlogPost, User, PostCategorie } = require('../models');
const jwtFuncs = require('../utils/jwt');

const post = async (req, res, _next) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;

  try {
    const { email } = jwtFuncs.validateToken(authorization);

    const user = await User.findOne({ where: { email } });

    const { null: postId } = await BlogPost
      .create({ title, content, userId: user.id });

    categoryIds.forEach(async (categoryId) => {
      await PostCategorie.create({ postId, categoryId });
    });
    
    const postReturn = { id: postId, title, content, userId: user.id };

    return res.status(201).json(postReturn);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  post,
};
