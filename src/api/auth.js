const router = require('express').Router();
const jwt = require('express-jwt');

router.get('/login', (req, res) => {
  // handle with passport
  res.json({ test: 'login' });
});


router.get('/logout', (req, res) => {
  // handle with passport
  res.json({ test: 'logout' });
});

router.get(('/google'), (req, res) => {
  res.json({ test: 'google' });
});

module.exports = router;
