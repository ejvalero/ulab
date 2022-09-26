const slugify = require('slugify');


// db connection
const pool = require('../database/db');


module.exports = {



  /**
   * 
   * 'get' controllers
   */

  // get all records
  list: (view, layout, table, customData = null) => {
    return async (req, res) => {
      try {
        const data = await pool.query('SELECT * FROM ' + table);        
        const outputData = customData  ? { ...customData, data, layout } : { data, layout};
        res.render( view, outputData );
      }
      catch(error) {
        console.log(error.code); 
      }
    }
  },

  // get one record
  getOne: (view, layout, slug, table, customData = null) => {
    return async (req, res) => {
      const usbid = req.params[slug];
      try {
        const data = await pool.query('SELECT * FROM ' + table + ' WHERE usbid = ?', [usbid]);
        if(data[0]) {
          const outputData = data[0];
          res.render(
            view,
            { ...customData, data: outputData, layout }
          )
        }
      }
      catch(error) {
        res.status(404).send('Page not found');
      }
    } 
  },

  // render the form to add new record
  addPage: (view, layout, customData) => {
    return (req, res) => res.render(view, {...customData, layout});
  },

  // render the form to update an existing record
  editPage: (view, layout, table, customData) => {
    return async (req, res) => {
      const { usbid } = req.params;
      try {
        const data = await pool.query(`SELECT * FROM ${table} WHERE usbid = ?`, [usbid]);
        res.render( view, { ...customData, data: data[0], layout });
      }
      catch(error) {
        res.send(error).status(error.code);
      }
    }
  },




  /**
   * 
   * 'delete' controller
   */
  delete: (table) => {
    return async (req, res) => {
      const { usbid } = req.params;
  
      try{
        await pool.query('DELETE FROM ' + table + ' WHERE usbid = ?', [usbid]);
        req.flash('success', 'Datos eliminados correctamente');
      }
      catch(error) {
        const messages = {
          'ER_DUP_ENTRY': 'No se pueden guardar los datos. Ya existe el registro',
          'ER_BAD_FIELD_ERROR': 'Los campos no coinciden con los existentes en la base de datos.'
        };
  
        const generalMsg = 'No se puede guardar el registro. Revise los datos e intente de nuevo';
        const message = messages[error.code] || generalMsg;
        
        req.flash('failed', message);
      }
  
      res.redirect('/admin/laboratorios');
    }
  },




  /**
   * 
   * 'post' controllers
   */

  // add new record
  add: (table, slugField) => {
    return async (req, res) => {
      const data = req.body;

      let slug = data[slugField].split('@')[0];
      const newId = slugify(slug, {lower: true, strict: true});
      const url = `${req.headers.host}${req.baseUrl}/${newId}`;

      const newData = {...data, usbid: newId, url};
      console.log(newData)

      try {
        await pool.query(`INSERT INTO ${table} SET ?`, [newData]);
        req.flash('success', 'Datos almacenados correctamente');
        res.redirect(`${req.baseUrl}/${newId}`);
      }
      catch(error) {
        console.log(error);
        const messages = {
          'ER_DUP_ENTRY': 'No se pueden guardar los datos. Ya existe el registro',
          'ER_BAD_FIELD_ERROR': 'Los campos no coinciden con los existentes en la base de datos.'
        };

        const generalMsg = 'No se puede guardar el registro. Revise los datos e intente de nuevo';
        const message = messages[error.code] || generalMsg;
        
        req.flash('failed', message);
        res.redirect(`${req.baseUrl}`);
      }
    }
  },


  // update controller
  update: (paramId, table) => {
    return async (req, res) => {
      const data = req.body;
      const id = req.params[paramId];
      const usbid = data.usbid;

      const url = `${req.headers.host}${req.baseUrl}/${usbid}`;
      const newData = {...data, usbid, url};

      console.log(newData);

      try {
        await pool.query(`UPDATE ${table} SET ? WHERE usbid = ? `, [newData, id]);
        req.flash('success', 'Datos actualizados correctamente');
      }
      catch(error) {
        console.log(error);
        const messages = {
          'ER_DUP_ENTRY': 'No se pueden guardar los datos. Ya existe el registro',
          'ER_BAD_FIELD_ERROR': 'Los campos no coinciden con los existentes en la base de datos.'
        };

        const generalMsg = 'No se puede guardar el registro. Revise los datos e intente de nuevo';
        const message = messages[error.code] || generalMsg;

        req.flash('failed', message);
      }

      res.redirect(`${req.baseUrl}/${usbid}/edit`);
    }
  }

}