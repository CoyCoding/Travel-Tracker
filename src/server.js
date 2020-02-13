const express = require('express');
const morgan = require('morgan');

// Create basic server
const app = express();

// Set host port to env file or 6161 in DEV
const port = process.env.PORT || 6161;

// listen on port
app.listen(port, () => {
  console.log(`App listening on localhost:${port}`);
});
