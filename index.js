//importing express library
const express = require('express');
//creating express app
const app = express();
//importing mysql library
const mysql = require('mysql');

// importing body parser and link it to the express app
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//port definition, if environment variable is undefined use default to 8082
const port = process.env.PORT || 8082;

//root directory get request route handler for testing
app.get('/', async (req, res) => {
    res.json({ status: 'API is ready'});
});

//get request people by id route handler
app.get('/people/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const person = await getPeopleById(id);
    res.json({status:'success', data: {person: person}});
}); 

//get people instance by id handler
async function getPeopleById(id) {
    return new Promise(function(resolve, reject){
        const sql = 'SELECT * FROM people WHERE id=?';
        getDbPool().query(sql, [id], (err, results) => {
            resolve(results[0]);
        });
    });
}
//db connection function
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
//start listening on defined port
app.listen(port, () => {
  console.log('REST API listening on port ', port);
});