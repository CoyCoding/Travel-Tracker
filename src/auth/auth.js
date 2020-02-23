const router = require('express').Router();
const validator = require('express-joi-validation').createValidator({});
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken, checkForExistingUsers } = require('./utils/auth');
const User = require('../database/models/User');
const { UserAuth, validateUserAuth } = require('../database/models/UserAuth');


router.post('/sign-up', validator.body(validateUserAuth), async (req, res, next) => {
  const { username, password, email } = req.body;
  // check for database for existing username or email.
  const existingUsers = await UserAuth.find({ $or: [{ username }, { email }] });
  // Return error depending on what exists.
  const exists = checkForExistingUsers(existingUsers, username);
  if (exists) {
    res.status(400);
    return next(exists);
  }
  // Create new user
  const user = new User({ username, email });
  // Generate hashed password
  const hashedPassword = await bcrypt.hash(password, 10);
  return user.save().then((userdata) => {
    const userAuth = new UserAuth({
      username,
      email,
      password: hashedPassword,
      user_id: userdata.id,
    });
    // create new auth for user
    return userAuth.save().then((data) => {
      console.log(data);
      const accessToken = generateAccessToken({ username: data.username, id: data.user_id });
      console.log(accessToken);
      res.set('access-token', accessToken);
      return res.json(user);
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

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  // Find AuthUser with email and password
  try {
    const user = await UserAuth.findOne({ email });
    if (await bcrypt.compare(password, user.password)) {
      // Generate Token place in header
      const accessToken = generateAccessToken({ username: user.username, id: user.user_id });
      res.set('access-token', accessToken);
      // find logged in user data
      const userData = await User.findOne({ username: user.username });
      // return that users data
      return res.json(userData);
    }
    throw new Error();
  } catch (e) {
    res.status(400);
    return next(new Error('invaild email or password'));
  }
});

router.get('/logout', (req, res) => {
  // JWT donesn't need a log out at this time
  res.json({ test: 'logout' });
});

module.exports = router;
