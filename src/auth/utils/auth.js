const jwt = require('jsonwebtoken');

// Needs username and User.id --NOT AUTH USER ID--
const generateAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });

// Needs username
const generateRefreshToken = (user) => jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5d' });

const checkForExistingUsers = (users, username, email) => {
  if (users.length) {
    let message;
    if (users.length === 2) {
      message = 'Sorry, that username and email are unavailable';
    } else if (users[0].username === username && users[0].email === email) {
      message = 'Sorry, that username and email are unavailable';
    } else if (users[0].username === username) {
      message = 'Sorry, that username is unavailable';
    } else {
      message = 'Sorry, that email is unavailable';
    }
    return message;
  }
  return undefined;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  checkForExistingUsers,
};
