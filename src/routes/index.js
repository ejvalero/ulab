const express = require('express');
const router = express.Router();

router.use('/', require('./client'));
//router.use('/admin', require('./admin'));

module.exports = router;