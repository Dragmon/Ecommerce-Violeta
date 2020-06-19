const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  res.send('i am here categories');
});

module.exports = router;
