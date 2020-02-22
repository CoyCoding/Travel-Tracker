const router = require('express').Router();
const Location = require('../database/models/Location');
const Image = require('../database/models/Image');
const User = require('../database/models/User');
const { push, returnCopy } = require('./utils/mongooseModifiers');
const { auth } = require('../middlewares/middlewares');

// GET - All locations
router.get('/', auth, async (req, res) => {
  const userId = req.body.user_id;
  // Get logged in user Info
  const user = await User.findOne({ _id: userId }).populate({
    path: 'following',
    populate: {
      path: 'locations',
      model: 'Location'
    }
  }).populate('locations');
  // Get all locations for user and users friends
  // const locations = await Location.find({ user_id: { $in: [userId, ...user.following] } });
  // // Get all friends of user
  // const following = await User.find({ _id: { $in: [...user.following] } });
  // Add locations and users you are following to User object
  console.log(user, 'user');
  console.log(user.locations, 'locations');
  console.log(user.following, 'following');
  res.json(user);
});

// GET - Location by id
router.get('/byId', auth, async (req, res) => {
  const locationId = req.body.id;
  // GET Location by id
  const locations = await Location.findById(locationId);
  res.json(locations);
});

router.put('/add-image', auth, async (req, res, next) => {
  const locationId = req.body.id;
  // BUILD image for upload
  const image = new Image({ originalSrc: 'www.newImage.com' });
  // Update Location with image
  Location.findByIdAndUpdate(locationId, push({ images: image }), returnCopy)
    .then((newLocation) => {
      res.json(newLocation.images);
    }).catch((error) => {
      next(error);
    });
});

router.post('/', auth, async (req, res, next) => {
  const userId = req.body.user_id;
  const location = new Location(req.body);
  await location.save().then((entry) => {
    User.findByIdAndUpdate(userId, { $addToSet: { locations: location } })
      .then(() => res.json(entry))
      .catch((err) => next(err));
  }).catch((error) => {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  });
});

module.exports = router;
