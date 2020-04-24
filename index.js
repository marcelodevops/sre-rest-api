//import libraries

const express = require('express');
const app = express();

const mysql = require('mysql');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = process.env.PORT || 8082;
//handler to root directory get request
app.get('/', async (req, res) => {
    res.json({ status: 'API is ready'});
});



let cachedDb;
function getDbPool() {
    if(!cachedDb) {
        cachedDb = mysql.createPool({
            connectionLimit: 1,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_NAME,
            socketPath: `/cloudsql/${process.env.INST_CON_NAME}`

        });
        
    }
    return cachedDb;
}

app.listen(port, () => {
  console.log('REST API listening on port ', port);
});