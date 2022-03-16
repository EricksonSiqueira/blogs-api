const { Category } = require('../models');

const post = async (req, res, _next) => {
  const { name } = req.body;

  try {
    const categorie = await Category.create({ name });

    return res.status(201).json(categorie);
  } catch (error) {
    console.log(error);

    return res.status(400).json({ message: 'Algo deu errado' });
  }
};

const getAll = async (_req, res, _next) => {
  try {
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  post,
  getAll,
};
