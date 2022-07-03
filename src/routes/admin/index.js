const express = require('express');
const router = express.Router();



/**
 * Home page
 */
router.get(
  '/',
  (req, res) => {
    res.send('Running happily from ADMIN PANEL');
  }
)

router.use('/labs', require('./labs'))



/**
 * 
 * export routes
 */
module.exports = router;