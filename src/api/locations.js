const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'GET:// location api 😂',
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.json({
    ...req.body,
  });
});

module.exports = router;
