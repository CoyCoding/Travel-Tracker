const router = require('express').Router();
const mongoose = require('mongoose');
const Location = require('../database/models/Location');
const Image = require('../database/models/Image');
const User = require('../database/models/User');
const { findUser, isFollowing } = require('./utils/followQueries');
const { push, returnCopy } = require('./utils/mongooseModifiers');
const { auth } = require('../middlewares/middlewares');
// GET - All


router.post('/add', auth, async (req, res, next) => {
  const userToFollowId = req.body.userToFollow;
  const userId = req.body.user_id;
  try {
    // Check that user to Follow exists
    const userToFollow = await findUser(userToFollowId);
    // Find currently logged on user and update
    User.findByIdAndUpdate(userId, { $addToSet: { following: userToFollow } }, returnCopy)
      .then((user) => {
        User.findByIdAndUpdate(userToFollowId, { $addToSet: { followers: user } })
          .then(() => res.json(user))
          .catch((err) => next(err));
      }).catch((err) => next(err));
  } catch (e) {
    res.status(400);
    next(e);
  }
});

router.post('/remove', auth, async (req, res, next) => {
  const userId = req.body.user_id;
  const userToUnfollowId = req.body.userToUnfollow;
  User.findByIdAndUpdate(userId, { $pull: { following: { _id: userToUnfollowId } } },
    { new: true, upsert: true })
    .then((user) => res.json(user))
    .catch((err) => next(err));
});

module.exports = router;
