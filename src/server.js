const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const corsConfig = require('./config/cors');
const middlewares = require('./middlewares/middlewares');

dotenv.config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

// Create basic server
const app = express();
const port = process.env.PORT || 6161;

// Pre-Route Middleware
//  - logs: requests
app.use(morgan('common'));

//  - security: Hides headers
app.use(helmet());

//  - security: Set acceptable incoming req domains
app.use(cors(corsConfig));

// GET: ROUTES
app.get('/', (req, res) => {
  res.json({ message: 'working' });
});

// Post-Route Middleware
// Returns detailed 404 errors
app.use(middlewares.notFound);

// Handles all server based errors
app.use(middlewares.errorHandler);

//
//  Start App on ${port}
//
app.listen(port, () => {
  console.log(`App listening on localhost:${port}`);
});
