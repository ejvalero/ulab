const express = require('express');
const router = express.Router();
var slugify = require('slugify');

// db connection
const pool = require('../../db');


// view to list all labs
router.get(
  '/',
  async (req, res) => {
    const labs = await pool.query('SELECT * FROM labs');
    res.render('admin/laboratorios/list', { labs });
  }
)


// view to add new lab
router.get(
  '/add',
  (req, res) => {
    res.render('admin/laboratorios/add');
  }
);


// form to add new lab
router.post(
  '/add',
  async (req, res) => {
    const { name, area, location, description } = req.body;
    const nameSlug = slugify(name, {lower: true, strict: true});
    const urlcomponents = [ req.headers.host, req.baseUrl.slice(1), nameSlug ];

    const newLab = {
      name,
      slug: nameSlug,
      url: urlcomponents.join('/'),
      area,
      description,
      location
    };

    await pool.query(
      'INSERT INTO labs SET ?',
      [ newLab ]
    );

    res.redirect('/admin/laboratorios');
  }
);


// form to delete labs
router.get(
  '/:slug/delete',
  async (req, res) => {
    const { slug } = req.params;
    await pool.query('DELETE FROM labs WHERE slug = ?', [slug]);
    res.redirect('/admin/laboratorios');
  }
);


// wiew to edit labs
router.get(
  '/:slug/edit',
  async (req, res) => {
    const { slug } = req.params;
    const labs = await pool.query('SELECT * FROM labs WHERE slug = ?', [slug]);
    res.render('admin/laboratorios/edit', { lab: labs[0] });
  }
)


router.post(
  '/:slug/edit',
  async (req, res) => {
    const { slug } = req.params;
    const { name, area, description, location } = req.body;

    const newLab = {
      name,
      area,
      description,
      location
    }

    pool.query('UPDATE labs SET ? WHERE slug = ?', [newLab, slug]);
    res.redirect('/admin/laboratorios');
  }
)


module.exports = router;