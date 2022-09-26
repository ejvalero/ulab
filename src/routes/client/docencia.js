const express = require('express');
const pool = require('../../database/db');
const router = express.Router();


// Constants
const mainCategory  = 'Laboratorios';
const itemsCategory = 'Laboratorio';
const internalError = '<code><b>Error</b>: Internal error, please try again later.</code>';



// TODO: mover esto a la base de datos principal
const staticData =   {
  title: 'Docencia e Investigación',
  subtitle: 'Lorem ipsum dolet',
  name: 'Laboratorios',
  description: `
    Los laboratorios son unidades académico-administrativas (dependencias de apoyo),
    que se encargan de los Procesos medulares de la Unidad de Laboratorios.
  `,
  objectives: `
    Planificar, coordinar y controlar las actividades de las diferentes 
    Secciones relacionadas a la prestación de los servicios de laboratorios
    requeridos en la ejecución de los planes de estudio de pregrado y de postgrado
    de la USB que ameritan actividades experimentales, así como para las actividades de
    investigación y de extensión desarrolladas en ellos.
  `,
  personal: `
    Cada Laboratorio está conformado por una Jefatura de Laboratorio (Dirección),
    un Consejo Asesor de Laboratorio, una Unidad de Apoyo y por unidades operativas
    denominadas Secciones. Está bajo la responsabilidad de un “Jefe de Laboratorio”  
    quien es el encargado del cumplimientos de los objetivos.
    Las Secciones se encargan de ejecutar los servicios de laboratorios en su área de competencia,
    para atender la demanda generada de sus actividades de docencia, investigación y extensión.
  `,
  components: {
    description: `
      Los Laboratorios están agrupados de acuerdo a especialidades y a una zona geográfica determinada, como sigue:
    `,
    items: [
      {name: 'Laboratorio A', slug: 'laba', description: 'Laboratorios de Ingeniería Aplicada'}, 
      {name: 'Laboratorio B', slug: 'labb', description: 'Laboratorios de Biología, Química y Polímeros'},
      {name: 'Laboratorio C', slug: 'labc', description: 'Laboratorios de Electrónica, Laboratorio C'},
      {name: 'Laboratorio D', slug: 'labd', description: 'Laboratorios de Física, Laboratorio D'},
      {name: 'Laboratorio E', slug: 'labe', description: 'Laboratorios de Materiales y Procesos de Fabricación'},
      {name: 'Laboratorio F', slug: 'labf', description: 'Laboratorios de Tecnología de la Información'},
      {name: 'Laboratorio G', slug: 'labg', description: 'Laboratorios de la Sede del Litoral'}
    ]
  }
}; 
 
 
 




// todos los laboratorios
router.get( 

  '/',
  
  async (req, res) => {

    const data = await pool.query('SELECT * FROM dependencies');

    const main = data.filter(item => item.name === mainCategory)[0];

    const components = data.filter(item => item.category === itemsCategory)

    res.render('client/docencia', {
      layout: 'client',
      content: {
        main,
        components
      }
    });

  }

);





// laboratorios individuales
router.get(
  
  '/:id',
  
  async (req, res) => {
  
    const {id} = req.params;
  
    try {

      const data = await pool.query('SELECT * FROM labs WHERE usbid = ?', [id]);
      const output = {...staticData, data: data[0]}

      if(data[0] && data[0].usbid === id) {
        res.render('client/docencia/laboratorio', {
          layout: 'client',
          lab: output
        })
      }
      else {
        res.send('<code><b>Error</b>: Page not found</code>');
      }

    }

    catch(error) { res.send(internalError) }

  }

);




// personal por laboratorio
router.get(

  '/:id/personal',
  
  async (req, res) => {

    const {id} = req.params;
    const type = req.query.type;
        
    const title = staticData
      .components
      .items
      .filter(item => item.slug === id)[0]

    const location = title.name;
    const name = title.description

    try {
      
      const dependency = await pool.query('SELECT id FROM dependencies WHERE usbid = ?', [id]);      
      const persons = await pool.query('SELECT * FROM employees WHERE dep_id = ?', [dependency[0].id]);

      const outputPersons = {
        academico: persons.filter(person => person.type === 'Académico'),
        administrativo: persons.filter(person => person.type === 'Administrativo'),
        tecnico: persons.filter(person => person.type === 'Técnico'),
        obrero: persons.filter(person => person.type === 'Obrero')
      }

      res.render(
        'client/personal/laboratorio',
        {
          layout: 'client',
          personal: {...staticData, ...outputPersons},
          location,
          name,
          slug: id
        }
      )

    }
    
    catch(error) { res.send(internalError) }

  }

);


// ficha de persona filtrada por tipo de persona


// ficha de cada persona
router.get(
  '/:id/personal/:usbid',
  (req, res) => {
    const {id, usbid} = req.params;
    res.send('ESTA ES LA FICHA DE ' + id + '/' + usbid);
  }
);


// not found
router.use('*', (req, res) => {
  res.send('<code><b>Strong</b>: Not data found</code>')
});



module.exports = router;