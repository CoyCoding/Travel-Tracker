const mongoose = require('mongoose');

class db {
  constructor() {
    this.databaseURL = process.env.DATABASE_URL;
    this.mongoose = mongoose;
  }

  connect() {
    this.mongoose.connect(this.databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('DB connected');
    }).catch((error) => {
      console.log(error);
    });
  }
}

module.exports = db;
