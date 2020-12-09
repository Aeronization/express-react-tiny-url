const { connect } = require('http2');
const mysql = require('mysql');

/* (R. Friel - December 08, 2020) - Connect to Heroku cleardb. */
let connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL || 'mysql://b1f60bc917ec53:b3839c48@us-cdbr-east-02.cleardb.com/heroku_5ec92f870aee296?reconnect=true');

connection.connect();

module.exports = connection;