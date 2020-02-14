const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const corsConfig = require('./config/cors.js');

// Create basic server
const app = express();

// Middleware
// Backend - logs: requests
app.use(morgan('common'));
// Backend - security: Hides headers
app.use(helmet());
// Backend - security: Set acceptable incoming req domains
app.use(cors(corsConfig));

// Set host port to env file or 6161 in DEV
const port = process.env.PORT || 6161;

// GET: ROUTES
app.get('/', (req, res) => {
  res.json({ message: 'working' });
});

app.use((req, res, next) => {
  const error = new Error(`Not the route you are looking for - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((error, req, res, next)=>{
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: error.stack,
  });
});

// listen on port
app.listen(port, () => {
  console.log(`App listening on localhost:${port}`);
});
