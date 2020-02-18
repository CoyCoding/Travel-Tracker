const router = require('express').Router();
const validator = require('express-joi-validation').createValidator({});
const jwt = require('jsonwebtoken');
const signUp = require('./utils/validation');
const { generateAccessToken, generateRefreshToken, checkForExistingUsers } = require('./utils/auth');
const User = require('../database/models/User');
const UserAuth = require('../database/models/UserAuth');


router.post('/sign-up', validator.body(signUp), async (req, res, next) => {
  const { username, password, email } = req.body;
  const users = await UserAuth.find({ $or: [{ username }, { email }] });
  const exists = checkForExistingUsers(users, username);
  if (exists) {
    res.status(400);
    return next(exists);
  }
  const user = new User({ username, email });
  return user.save().then((userdata) => {
    const refreshToken = generateRefreshToken({ username, id: userdata.id });
    const userAuth = new UserAuth({
      username,
      email,
      password,
      refreshToken,
      user_id: userdata.id,
    });
    return userAuth.save().then((data) => {
      console.log(data);
      const accessToken = generateAccessToken({ username: data.username, id: data.user_id });
      console.log(accessToken);
      res.set('access-token', accessToken);
      return res.json({ data, accessToken });
    }).catch((err) => {
      console.log('userAuth fail');
      console.log(err);
      return next(err);
    });
  }).catch((error) => {
    console.log('user Add failed');
    return res.json(error);
  });
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // Find user with email and password
  const user = await UserAuth.findOne({
    $and: [{ email }, { password }]
  });
  const accessToken = generateAccessToken({ username: user.username, id: user.user_id });
  res.set('access-token', accessToken);
  const userData = await User.findOne({
    username: user.username
  });
  res.json({ userData });
});

router.get('/logout', (req, res) => {
  // handle with passport
  res.json({ test: 'logout' });
});

module.exports = router;
