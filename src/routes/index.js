const express = require('express');
const router = express.Router();



/**
 * Home page
 */
router.get('/', (req, res) => {
  res.send('Running happyly');
});



/**
 * 
 * export routes
 */
module.exports = router;