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
      model: 'Location',
    },
  }).populate('locations');
  res.json(user);
});

// Get - locations for selected users
router.get('/user', auth, async (req, res) => {
  const { userId } = req.body;
  // Get logged in user Info
  const user = await User.findOne({ _id: userId }).populate('locations');
  res.json(user);
});

// POST - Add location to posting user
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

// GET - Location by id
router.get('/byId', auth, async (req, res) => {
  const locationId = req.body.id;
  // GET Location by id
  const locations = await Location.findById(locationId);
  res.json(locations);
});

// POST - Create an image on the server
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

module.exports = router;
