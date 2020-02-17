const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../auth/auth');

const tempTokens = [];

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
  tempTokens.push(refreshToken);
  res.set('access-token', accessToken);
  res.set('refresh-token', refreshToken);
  res.json({ user, accessToken, refreshToken });
});

router.post('/token', (req, res, next) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) {
    res.status(401);
    return next(new Error('Not Logged in'))
  }
  if (!tempTokens.includes(refreshToken)) {
    res.status(403);
    return next(new Error('Token not in database'))
  }
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      res.status(403);
      return next(new Error('Bad Token'));
    }
    console.log(user);
    return user;
  });
  const accessToken = generateAccessToken({ user: decoded.user });
  return res.json({ accessToken });
});

router.get('/logout', (req, res) => {
  // handle with passport
  res.json({ test: 'logout' });
});

router.get(('/google'), (req, res) => {
  res.json({ test: 'google' });
});

module.exports = router;
