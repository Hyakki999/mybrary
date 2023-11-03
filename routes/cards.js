const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('cards/index');
});

module.exports = router;
