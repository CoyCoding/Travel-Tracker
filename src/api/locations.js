const { Router } = require('express');
const Location = require('../database/models/Location');
const Image = require('../database/models/Image');
const { push, returnCopy } = require('./utils/mongooseModifiers');

const router = Router();

// GET - All locations
router.get('/', async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
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

router.post('/', (req, res, next) => {
  const location = new Location(req.body);
  location.save().then((entry) => {
    res.json(entry);
  }).catch((error) => {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  });
});

module.exports = router;
