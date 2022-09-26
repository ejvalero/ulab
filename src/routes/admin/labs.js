const express = require('express');
const router = express.Router();
const { platform } = require('../../config');
const controllers = require('../../controllers');


// custom labs data
const viewLabsData = { platform: platform.content.labs, buttons: platform.buttons }
const viewLabData = { platform: platform.content.lab, buttons: platform.buttons }
const id = 'usbid';
const layout = 'admin';
const dbTable = 'labs'


// paths
const pathAll = 'admin/laboratorios';
const pathAdd = 'admin/laboratorios/add';
const pathEdit = 'admin/laboratorios/edit';
const pathSingle = 'admin/laboratorios/detail';


// view to list all labs
router.get('/', controllers.list(pathAll, layout, dbTable, viewLabsData));

// add new lab
router.get('/add', controllers.addPage(pathAdd, layout, viewLabData));
router.post('/add', controllers.add(dbTable, id));

// delete labs
router.get(`/:${id}/delete`, controllers.delete(dbTable));

// edit labs
router.get(`/:${id}/edit`, controllers.editPage(pathEdit, layout, dbTable, viewLabData));
router.post(`/:${id}/edit`, controllers.update(id, dbTable));

// get single record
router.get(`/:${id}`, controllers.getOne(pathSingle, layout, id, dbTable, viewLabData));


module.exports = router;