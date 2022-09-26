const express = require('express');
const router = express.Router();
const { platform } = require('../../config');
const controllers = require('../../controllers');


// custom personal data
const viewPersonsData = { platform: platform.content.persons, buttons: platform.buttons }
const viewPersonData = { platform: platform.content.person, buttons: platform.buttons }
const id = 'usbid';
const layout = 'admin';
const dbTable = 'employees';


// paths
const list_template   = 'admin/personal';
const add_template    = 'admin/personal/add';
const edit_template   = 'admin/personal/edit';
const single_template = 'admin/personal/detail';



// view to list all labs
router.get('/', controllers.list(list_template, layout, dbTable, viewPersonsData));


// view to add new person
router.get('/add', controllers.addPage(add_template, layout, viewPersonData));
router.post('/add', controllers.add(dbTable, id));


// add new lab
router.get('/add', controllers.addPage(add_template, layout, viewPersonData));
router.post('/add', controllers.add(dbTable, id));

// delete labs
router.get(`/:${id}/delete`, controllers.delete(dbTable));

// edit labs
router.get(`/:${id}/edit`, controllers.editPage(edit_template, layout, dbTable, viewPersonData));
router.post(`/:${id}/edit`, controllers.update(id, dbTable));

// get single record
router.get(`/:${id}`, controllers.getOne(single_template, layout, id, dbTable, viewPersonData));


// form to delete persons
/*
router.get(
  '/:username/delete',
  async (req, res) => {
    const { username } = req.params;

    try {
      await pool.query('DELETE FROM employees WHERE username = ?', [username]);
      req.flash('success', 'Datos eliminados correctamente');
    }
    catch(error) {
      req.flash('failed', 'No se ha podido eliminar el registro seleccionado');
    }

    res.redirect('/admin/personal');
  }
);
*/



// wiew to edit labs
/*
router.get(
  '/:username/edit',
  async (req, res) => {
    const { username } = req.params;
    const persons = await pool.query('SELECT * FROM employees WHERE username = ?', [username]);

    res.render(
      'admin/personal/edit',
      {
        layout: 'admin',
        person: persons[0],
        platform: platform.content.person,
        buttons: platform.buttons      
      }
    );
  }
);

router.post(`/:username/edit`, controllers.update('username', 'employees', 'username'));
*/






module.exports = router;