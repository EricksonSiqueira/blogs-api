require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (displayName, email) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const jwtObj = {
    displayName,
    email,
  };

  const token = jwt
    .sign(jwtObj, process.env.JWT_SECRET, jwtConfig);

  return token;
};

const validateToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded;
};

module.exports = { generateToken, validateToken };
