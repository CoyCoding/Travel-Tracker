const router = require('express').Router();
const validator = require('express-joi-validation').createValidator({ passError: true });
const signUp = require('./utils/validation');
const { generateAccessToken, generateRefreshToken } = require('./utils/auth');
const Token = require('../database/models/Token');

router.post('/sign-up', validator.query(signUp), (req, res) => {
  const { username, password, email } = req.body;
  console.log(username, password, email);
  res.json({ username, password, email });
});

router.post('/login', (req, res) => {
  const { user } = req.body;
  const data = { user };
  const accessToken = generateAccessToken(data);
  const refreshToken = generateRefreshToken(data);
  // ** ********************************************* **
  // *                                                 *
  // *  NEED DATABASE FOR USERS WITH REFRESH TOKENS!!! *
  // *                                                 *
  // ** ********************************************* **
  const token = new Token({ token: refreshToken });
  console.log(token);
  token.save().then(() => {
    res.set('access-token', accessToken);
    res.set('refresh-token', refreshToken);
    res.json({ user, accessToken, refreshToken });
  }).catch(() => {
    res.json({ error: 'this shouldn\'t fail' });
  });
});

router.get('/logout', (req, res) => {
  // handle with passport
  res.json({ test: 'logout' });
});

module.exports = router;
