const jwt = require('jsonwebtoken');

// Needs username and User.id --NOT AUTH USER ID--
const generateAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });

// Needs username
const generateRefreshToken = (user) => jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5d' });

const checkForExistingUsers = (users, username) => {
  if (users.length) {
    const error = new Error();
    if (users.length === 2) {
      error.message = 'Sorry, that username and email are unavailable';
    } else if (users[0].username === username) {
      error.message = 'Sorry, that username is unavailable';
    } else {
      error.message = 'Sorry, that email is unavailable';
    }
    return error;
  }
  return undefined;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  checkForExistingUsers,
};
