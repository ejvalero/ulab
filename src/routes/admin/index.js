const express = require('express');
const router = express.Router();



/**
 * Home page
 */
router.get(
  '/',
  (req, res) => {
    res.render('main', {layout: 'admin'});
  }
)

/**
 * Laboratories
 */
router.use('/laboratorios', require('./labs'));

/**
 * Personal (team membern info)
 */
router.use('/personal', require('./personal'));


/**
 * Rando routes
 */
router.use('*', (req, res) => res.status(404).send('Page not found'));


/**
 * export routes
 */
module.exports = router;