const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../auth/utils/auth');
const Token = require('../database/models/Token');

// Middleware to handle requests for non-existant routes
const notFound = (req, res, next) => {
  const error = new Error("This isn't a route dummy");
  res.status(404);
  next(error);
};

// Middleware to handle status code errors
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.ENVIRONMENT,
  });
};


// Middleware to handle authChecking
const auth = async (req, res, next) => {
  // Store the Tokens
  const accessToken = req.headers['access-token'] && req.headers['access-token'].split(' ')[1];
  const refreshToken = req.headers['refresh-token'] && req.headers['refresh-token'].split(' ')[1];
  // If either are null not logged in
  if (!(accessToken && refreshToken)) {
    res.status(401);
    next(new Error('Not logged In'));
  }
  try {
    const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
  } catch (error) {
    if (error.name === 'TokenExpiredError') {

    }
  }
}

module.exports = {
  notFound,
  errorHandler,
  auth,
};
