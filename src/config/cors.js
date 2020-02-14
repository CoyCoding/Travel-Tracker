const whitelist = ['localhost:3333', 'null'];

const corsConfig = {
  orign(origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};


module.exports = corsConfig;