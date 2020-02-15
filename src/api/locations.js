const { Router } = require('express');
const Location = require('../database/models/Location');
const Image = require('../database/models/Image');
const { push, returnCopy } = require('./utils/mongooseModifiers');

const router = Router();

router.get('/', async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
});

router.get('/location-id', async (req, res) => {
  const locations = await Location.findById('5e47868af3289639405efd3a');
  res.json(locations);
});

router.put('/add-image', async (req, res, next) => {
  const locationId = req.body.id;
  const image = new Image({ originalSrc: 'www.newImage.com' });
  Location.findByIdAndUpdate(locationId, push({ images: image }), returnCopy)
    .then((newLocation) => {
      res.json(newLocation.images);
    }).catch((error) => {
      next(error);
    });
});

// router.post('/', (req, res, next) => {
//   const location = new Location(req.body);
//   location.save().then((entry) => {
//     res.json(entry);
//   }).catch((error) => {
//     if (error.name === 'ValidationError') {
//       res.status(422);
//     }
//     next(error)
//   });
// });
// router.post('/', (req, res, next) => {
//
// });

module.exports = router;
