const { Categorie } = require('../models');

const post = async (req, res, _next) => {
  const { name } = req.body;

  try {
    const categorie = await Categorie.create({ name });

    return res.status(201).json(categorie);
  } catch (error) {
    console.log(error);

    return res.status(400).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  post,
};
