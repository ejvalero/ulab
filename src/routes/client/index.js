const express = require('express');
const router = express.Router();

// página principal
router.use('/', require('./home'));

// sobre la ulab
router.use('/sobre-la-ulab', require('./about'));

// noticias
router.use('/noticias', require('./blog'));

// docencia
router.use('/docencia-e-investigacion', require('./docencia'));

// extension
router.use('/extension', require('./extension'));

// extension
router.use('/sistema-de-gestion-de-la-calidad', require('./calidad'));

// servicios
router.use('/servicios', require('./servicios'));

// not found
router.use('*', (req, res) => res.send('<code><b>Error</b>: Page not found</code>'));


module.exports = router;