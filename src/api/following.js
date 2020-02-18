const router = require('express').Router();
const Location = require('../database/models/Location');
const Image = require('../database/models/Image');
const User = require('../database/models/User');
const { push, returnCopy } = require('./utils/mongooseModifiers');
const { auth } = require('../middlewares/middlewares');

// GET - All locations
router.post('/add', auth, async (req, res, next) => {
  const userToFollowId = req.body.userToFollow;
  const userId = req.body.user_id;
  // Make sure user with Id exists
  const userToFollow = await User.findOne({
    _id: userToFollowId,
  });
  // Check if already following
  const alreadyFollowing = await User.find({
    _id: userId,
    following: { $elemMatch: { _id: userToFollowId } },
  });

  // error if already following
  if (alreadyFollowing.length) {
    res.status(400);
    return next(new Error({ name: 'AlreadyFollowingError', message: 'already following' }));
  }

  // Upated following list
  User.findByIdAndUpdate(req.body.user_id, push({ following: userToFollow }),
    { new: true, upsert: true })
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      return next(err);
    });
});

router.post('/remove', auth, async (req, res, next) => {
  const userId = req.body.user_id;
  const userToUnfollowId = req.body.userToUnfollow;
  User.findByIdAndUpdate(userId, { $pull: { following: { _id: userToUnfollowId } } },
    { new: true, upsert: true })
    .then((user) => {
      console.log(user)
      return res.json(user);
    }).catch((err) => {
      return next(err);
    });
});

module.exports = router;
