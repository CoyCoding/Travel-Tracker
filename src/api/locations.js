const router = require('express').Router();
const Location = require('../database/models/Location');
const Image = require('../database/models/Image');
const User = require('../database/models/User');
const { push, returnCopy } = require('./utils/mongooseModifiers');
const { auth } = require('../middlewares/middlewares');

// GET - All locations
router.get('/', auth, async (req, res) => {
  const user = await User.findOne();
  // console.log(user)
  // const locations = await Location.find({ user_id: [req.body.user_id, ...user.following] });
  // console.log(req.userData);
  res.json(user);
});

// GET - Location by id
router.get('/location-id', async (req, res) => {
  const locationId = req.body.id;
  // GET Location by id
  const locations = await Location.findById(locationId);
  res.json(locations);
});

router.put('/add-image', async (req, res, next) => {
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
  const location = new Location(req.body);
  await location.save().then((entry) => {
    res.json(entry);
  }).catch((error) => {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  });
});

module.exports = router;
