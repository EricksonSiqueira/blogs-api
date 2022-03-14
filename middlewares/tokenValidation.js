const { validateToken } = require('../utils/jwt');

const isTokenValid = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === undefined || authorization.length <= 2) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    validateToken(authorization);
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = {
  isTokenValid,
};
