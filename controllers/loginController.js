const { User } = require('../models');
const { generateToken } = require('../utils/jwt');

const post = async (req, res, _next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email, password } });

    if (user === null) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const token = generateToken(email, user.displayName);

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  post,
};
