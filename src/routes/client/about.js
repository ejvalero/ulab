const express = require('express');
const router = express.Router();
const pool = require('../../database/db');
const { setActive, setCustomRoute, getBreadcrumbs } = require('../../lib/utils');


// Constants
const title    = 'Sobre la ULab';
const subtitle = 'Que es y cual es la función de la ULab';

const jobs = [
  ['head',        'Director'    ],
  ['coordinator', 'Coordinador' ],
  ['assistant',   'Asistente'   ], 
  ['secretary',   'Secretaria'  ], 
  ['planner',     'Planificador']
];

const docenciaSlug  = 'docencia-e-investigacion';
const depsSlug      = 'sobre-la-ulab/dependencias';
const labCategory   = 'Laboratorio';
const notFound      = '<code><b>Error</b>: Page not found</code>';
const internalError = '<code><b>Error</b>: Internal error, please try again later.</code>';




router.get(

  '/',
  
  async (req, res) => {
  
    try {
  
      const data = await pool.query('SELECT * FROM about');
      const section = data.filter(item => item.slug === '')[0];
      const outputSections = setActive(data, 'slug', '');
      const breadcrumbs = getBreadcrumbs(req);

      res.render(
        'client/about',
        {
          layout: 'client',
          content: {
            title,
            subtitle,
            section,
            data: data[0],
            sections: outputSections,
            breadcrumbs,
          },
        }
      )
    }

    catch(error) { res.send(internalError) }

  }

);





router.get(
  
  '/:id',
  
  async (req, res) => {
    
    try {
      // db queries
      const id = req.params.id;
      const data = await pool.query('SELECT * FROM about WHERE slug = ?', [id]);

      if(data[0]) {

        const sections = await pool.query('SELECT title,slug,description FROM about');
        const deps = await pool.query('SELECT name,usbid,icon FROM dependencies WHERE category != ?', [labCategory]);

        // set up custom routes
        const customDeps = setCustomRoute(deps, 'usbid', docenciaSlug, depsSlug);

        // Set as 'active' the current tab based on the url
        const outputSections = setActive(sections, 'slug', id);

        // Filter sections by slug. This is used for assign custom views
        const section = outputSections.filter(item => item.slug === id)[0];
        const viewPath = id === 'dependencias' ? 'dependencias' : 'index';

        const breadcrumbs = getBreadcrumbs(req);

        res.render(
          `client/about/${viewPath}`,
          {
            layout: 'client',
            content: {
              title,
              subtitle,
              section,
              data: data[0],
              deps: customDeps,
              sections: outputSections,
              breadcrumbs
            },
          }
        )

      }

      else res.send(notFound);

    }

    catch(error) { res.send(internalError) }

  }

);





router.get(
  
  '/dependencias/:id',
  
  async (req, res) => {
    
    try {

      const { id } = req.params;
      const data = await pool.query('SELECT * FROM dependencies WHERE usbid = ?', [id]);
      
      if(data[0]) {

        const sections = await pool.query('SELECT title,slug,icon,description FROM about');
        const persons = await pool.query('SELECT name,lastname,degree,dep_job FROM employees WHERE dep_id = ?', [data[0].id]);
        const location = await pool.query('SELECT * FROM locations WHERE dep_id = ?', [data[0].id]);
        const outputSections = setActive(sections, 'slug', 'dependencias');

        // send an "empty content indicator" for check in the views
        const { vision, mision, description, objectives } = data[0];
        if([mision, vision, description, objectives].every(item => item)) data[0].emptyContent = true;

    
        // Setting up the data for output persons
        const outputPersons = {};
        jobs.map(person => {
          const key = person[0];
          const value = persons.filter(p => p.dep_job === person[1])[0];
          outputPersons[key] = value
        })
          
        res.render(
          `client/about/dependencia`,
          {
            layout: 'client',
            content: {
              data: data[0],
              location: location[0],
              persons: outputPersons,
              sections: outputSections,
              breadcrumbs: getBreadcrumbs(req)
            }
          }
        );

      }

      else res.send(notFound);
  
    }

    catch(error) { res.send(internalError) }

  }
);




module.exports = router