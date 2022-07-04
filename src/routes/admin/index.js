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

router.use('/laboratorios', require('./labs'))



/**
 * 
 * export routes
 */
module.exports = router;