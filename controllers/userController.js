const { User } = require('../models');
const generateToken = require('../utils/generateToken');

const post = async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;

  try {
    await User.create({ displayName, email, password, image });

    const token = generateToken(displayName, email);
    return res.status(201).json({ token });
  } catch (error) {
    console.log('esse aqui é o error', error.errors[0].message);

    if (error.errors[0].message.includes('Users.email must be unique')) {
      return res.status(409).json({ message: 'User already registered' });
    }

    res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  post,
};