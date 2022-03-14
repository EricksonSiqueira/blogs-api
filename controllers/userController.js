const { User } = require('../models');
const { generateToken } = require('../utils/jwt');
const createUserWithoutPassword = require('../utils/createUserWithoutPassword');

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

const getAll = async (req, res, _next) => {
  try {
    const users = await User.findAll();

    const usersWithoutPassword = users
      .map((user) => createUserWithoutPassword(user));

    return res.status(200).json(usersWithoutPassword);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  post,
  getAll,
};