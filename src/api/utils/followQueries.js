const User = require('../../database/models/User');

const findUser = async (userToFollowId) => {
  const userToFollow = await User.findOne({ _id: userToFollowId });
  if (!userToFollow) {
    throw new Error('This user doesn\'t exist');
  }
  return userToFollow;
};

const isFollowing = async (userId, userToFollowId) => {
  // Returns user if contains userToFollow
  const userToFollow = await User.findOne({
    _id: userId,
    following: { $elemMatch: { _id: userToFollowId } },
  });
  // error if already following
  return !!userToFollow;
};

module.exports = { findUser, isFollowing };
