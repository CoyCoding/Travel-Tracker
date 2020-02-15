const { Router } = require('express');
const Location = require('../database/models/Location');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'GET:// location api 😂',
  });
});

router.post('/', (req, res, next) => {
  const location = new Location(req.body);
  location.save().then((entry) => {
    res.json(entry);
  }).catch((error) => next(error));
});

module.exports = router;
