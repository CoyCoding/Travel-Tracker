module.exports = {
  // Whitelisted domains for accessing the api
  origin: [process.env.CORS_ORIGIN_CLIENT, 'http://localhost:3000/', 'localhost:3000', 'http://localhost:3000', 'mongodb://localhost:27102', '127.0.0.1:27017'],
  exposedHeaders: 'access-token',
};
