const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../auth/auth');

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
const auth = (req, res, next) => {
  // Store the Tokens
  const accessToken = req.headers['access-token'] && req.headers['access-token'].split(' ')[1];
  const refreshToken = req.headers['refresh-token'] && req.headers['refresh-token'].split(' ')[1];
  // If either are null not logged in
  if (!(accessToken && refreshToken)) {
    res.status(401);
    return next(new Error('Not logged In'));
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    console.log(error)
    if (error.name === 'TokenExpiredError') {
      const fakeDbCheck = true;
      if (fakeDbCheck) {
        console.log('database has a matching refresh')
        res.set('newHeader', 'test');
        console.log('payload?')
        return next();
      }
    }
    next(new Error(error.name));
  });
};

module.exports = {
  notFound,
  errorHandler,
  auth,
};
