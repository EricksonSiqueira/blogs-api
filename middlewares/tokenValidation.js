const { validateToken } = require('../utils/jwt');

const isTokenValid = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (authorization === undefined || authorization.length <= 2) {
      return res.status(401).json({ message: 'Token not found' });
    }
    validateToken(authorization);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  isTokenValid,
};
