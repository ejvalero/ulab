const mysql = require('mysql');
const { testingdb } = require('../keys');
const { promisify } = require('util');


const testingPool = mysql.createPool(testingdb);

testingPool.getConnection(
  (error, conn) => {
    if(error) throw error;

    if(conn) {
      conn.release();
      console.log('Successfuly connected to testingdb');
    }
    return;
  }
);