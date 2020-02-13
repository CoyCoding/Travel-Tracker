const express = require('express');

const app = express();

const port = process.env.PORT || 6161;

app.listen(port, ()=>{
    console.log(`App listening on localhost:6161`);
}
