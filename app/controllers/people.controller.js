const mysql = require('mysql')

let cachedDb2;
function getDbPool() {
    if(!cachedDb2) {
        cachedDb2 = mysql.createPool({
            connectionLimit: 1,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: process.env.SQL_NAME,
            socketPath: `/cloudsql/${process.env.INST_CON_NAME}`
            //host: '35.188.208.20',
            //port: 3306
        });
        
    }
    return cachedDb2;
}

// Retrieve and return all todos from the database.
exports.findAll = (req, res) => {
    getDbPool().query('select * from people',
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};