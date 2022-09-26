const express = require('express');
const { getBreadcrumbs } = require('../../lib/utils');
const router = express.Router();

router.get(
  '/',
  (req, res) => {
    res.render(
      'client/extension',
      {
        layout: 'client',
        breadcrumbs: getBreadcrumbs(req),
      });
  }
);

module.exports = router;