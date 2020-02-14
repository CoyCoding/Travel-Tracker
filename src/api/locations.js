const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'location api 😂',
  });
});

module.exports = router;
