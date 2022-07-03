const express = require('express');
const router = express.Router();
var slugify = require('slugify');

// db connection
const pool = require('../../db');

// routes
router.get(
  '/',
  async (req, res) => {
    const labs = await pool.query('SELECT * FROM labs');
    res.render('admin/labs/list', { labs });
  }
)


router.get(
  '/add',
  (req, res) => {
    res.render('admin/labs/add');
  }
);


router.post(
  '/add',
  async (req, res) => {
    const { name, area, location, description } = req.body;
    const urlcomponents = [
      req.headers.host,
      req.baseUrl.slice(1),
      slugify(name, {lower: true, strict: true})
    ];

    const newLab = {
      name,
      slug: urlcomponents.join('/'),
      area,
      description,
      location
    };
    await pool.query(
      'INSERT INTO labs SET ?',
      [ newLab ]
    );

   res.redirect('/admin/labs');
  }
);


module.exports = router;