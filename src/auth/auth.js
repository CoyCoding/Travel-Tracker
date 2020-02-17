const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });

const generateRefreshToken = (user) => jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
