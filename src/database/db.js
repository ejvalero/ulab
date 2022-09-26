const mysql = require('mysql');
const { database } = require('../keys');
const { promisify } = require('util');


// Try to create de connection to the database
const pool = mysql.createPool(database);


// Manage the connection created
pool.getConnection(

  (error, connection) => {

    // manage connection errors
    if(error) {
      const { code } = error;
      const messages = {
        'PROTOCOL_CONNECTION_LOST' : 'The database connection was closed',
        'ER_CON_COUNT_ERROR' : 'The database has too many connections',
        'ECONNREFUSED': 'The database connection was refused',
        'ER_ACCESS_DENIED_ERROR': 'Invalid credentials'
      };
      console.log(`ERROR CONNECTING DB: ${ messages[ code ]}`);
    }

    // if no errors, go ahead
    if(connection) {
      connection.release();
      console.log('Database successfuly connected');
    }

    return;

  }

);


// Promisify pool queries
pool.query = promisify(pool.query);


module.exports = pool;