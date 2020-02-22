const router = require('express').Router();
const User = require('../database/models/User');
const { returnCopy } = require('./utils/mongooseModifiers');
const { auth } = require('../middlewares/middlewares');

// Follower
router.post('/add', auth, async (req, res, next) => {
  const userToFollowId = req.body.userToFollow;
  const userId = req.body.user_id;
  try {
    // Check that user to Follow exists
    const userToFollow = await User.findOne({ _id: userToFollowId });
    if (!userToFollow) { throw new Error('This user doesn\'t exist'); }
    // Find currently logged on user and update following list
    User.findByIdAndUpdate(userId, { $addToSet: { following: userToFollow } }, returnCopy)
      .then((user) => {
        // Find followed user and add new follower
        User.findByIdAndUpdate(userToFollowId, { $addToSet: { followers: user } })
          .then(() => res.json(user))
          .catch((err) => next(err));
      }).catch((err) => next(err));
  } catch (e) {
    res.status(400);
    next(e);
  }
});

// Unfollow
router.post('/remove', auth, async (req, res, next) => {
  const userId = req.body.user_id;
  const userToUnfollowId = req.body.userToUnfollow;
  // remove from current user's following list
  User.findByIdAndUpdate(userId, { $pull: { following: { _id: userToUnfollowId } } }, returnCopy)
    .then((user) => {
      // remove user from ToUnfollow's follower list
      User.findByIdAndUpdate(userToUnfollowId, { $pull: { followers: { _id: userId } } })
        .then(() => res.json(user))
        .catch((err) => next(err));
    }).catch((err) => next(err));
});

module.exports = router;
