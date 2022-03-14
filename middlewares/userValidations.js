const validateEmail = require('../utils/validateEmail');

const isDisplayNameValid = (req, res, next) => {
  const { displayName } = req.body;

  if (typeof displayName.length === 'string' || !displayName) {
    return res.status(400).json({ message: '"displayName" must be a string' });
  }

  if (displayName.length < 8) {
    return res.status(400).json(
      { message: '"displayName" length must be at least 8 characters long' },
    );
  }

  next();
};

const isEmailValid = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  next();
};

const isPasswordValid = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }

  if (password.length < 6) {
    return res.status(400).json(
      { message: '"password" length must be 6 characters long' },
    );
  }

  next();
};

module.exports = {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
};
