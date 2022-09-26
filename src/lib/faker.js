const { faker } = require('@faker-js/faker');
const testingPool = require('../database/testingdb');

const makePerson = () => {
  return {
    uid: faker.datatype.uuid(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    job: faker.name.jobTitle(),
    email: faker.internet.email(),
    city: faker.address.cityName()
  }
}

const persons = Array.from( { length: 10} ).map(() => makePerson());

const rewriteTable = async table => {

  // query
  const query = `CREATE TABLE employees(
    id INT(11) NOT NULL,
    #
    # personal
    #
    per_name VARCHAR(150) NOT NULL,
    per_lastname VARCHAR(150) NOT NULL,
    per_biography TEXT,
    #
    ## institucional
    #
    ins_email VARCHAR(100) NOT NULL,
    ins_usbid VARCHAR(100) NOT NULL,
    ins_job VARCHAR(255) NOT NULL,
    ins_type VARCHAR(25),             # docente, administrativo, técnico, obrero
    ins_status_usb VARCHAR(10),       # lista de dos opciones activo o jubilado.
    #
    ## Adscripcion
    #
    dep_unit VARCHAR(100) NOT NULL,
    dep_section VARCHAR(100) NOT NULL,
    dep_laboratory VARCHAR(100) NOT NULL,
    dep_section_head BOOL,
    dep_laboratory_head BOOL,
    #
    ## Ubicación
    #
    loc_main_office VARCHAR(50),
    loc_adm_office VARCHAR(50),
    loc_lab_office VARCHAR(50),
    loc_main_phone VARCHAR(20),
    loc_adm_phone VARCHAR(20),
    loc_lab_phone VARCHAR(20),
    loc_main_phone_extension VARCHAR(4),
    loc_adm_phone_extension VARCHAR(4),
    loc_lab_phone_extension VARCHAR(4),
    #
    ## Auto generated dates
    #
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    updated_at timestamp NOT NULL DEFAULT current_timestamp
  )`;

  await testingPool.query(`DROP TABLE IF EXISTS ${table}`);

  await testingPool.query(`CREATE TABLE ${table}`);

  testingPool.end();
}

/*
const labs = async () => {
  const data = await pool.query('SELECT * FROM employees');
  console.log(data);
  pool.end()
}
*/

labs()