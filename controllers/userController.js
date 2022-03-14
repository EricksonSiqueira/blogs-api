const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const post = async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;

  try {
    await User.create({ displayName, email, password, image });
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const tokenUser = { displayName, email, image };
    const token = jwt.sign(tokenUser, process.env.SECRET, jwtConfig);
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