const express = require('express');
const { getBreadcrumbs } = require('../../lib/utils');
const router = express.Router();

router.get(
  '/',
  (req, res) => {
    res.render(
      'client/servicios',
      {
        layout: 'client',
        breadcrumbs: getBreadcrumbs(req),
      }
    )
  }
)

module.exports = router;