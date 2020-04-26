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

// Retrieve and return all people from the database.
exports.fetchAll = (req, res) => {
    getDbPool().query('select * from people',
        function (error, results, fields) {
            if (error) {
                return res.status(500).send({
                    message: "Server error"
                });
            }
            res.status(200).send(JSON.stringify(results));
        });
};

// Retrieve and return all people from the database.
exports.paginated = (req, res) => {
    getDbPool().query('select * from people',
        function (error, results, fields) {
            if (error) {
                return res.status(500).send({
                    message: "Server error"
                });
            }
            res.status(200).send(JSON.stringify(results));
        });
};



// Retrieve and return single person from the database.
exports.fetchOne = (req, res) => {
    getDbPool().query('select * from people where id=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) {
                return res.status(500).send({
                    message: "Server error"
                });
            }
            res.status(200).send(JSON.stringify(results[0]));
        });
};

// Add a new person
exports.create = (req, res) => {
    // Validate request
    if (!req.body.rut) {
        return res.status(400).send({
            message: "Invalid data, RUT can not be empty"
        });
    }

    var params = req.body;
    console.log(params);

    getDbPool().query("INSERT INTO people SET ? ", params,
        function (error, results, fields) {
            if (error) {
                return res.status(500).send({
                    message: "Server error"
                });
            }
            return res.status(200).send({
                data: results,
                message: 'Success. New person has been added.'
            });
        });
};


exports.update = (req, res) => {
    // Validate Request
    if (!req.body.rut) {
        return res.status(400).send({
            message: "Invalid data, RUT can not be empty"
        });
    }

    console.log(req.params.id);
    console.log(req.body.rut);
    getDbPool.query('UPDATE `people` SET ? where `id`=?',
        [req.body, req.params.id],
        function (error, results, fields) {
            if (error) {
                return res.status(500).send({
                    message: "Server error"
                });  
            }
            res.status(201).send(JSON.stringify(results));
        });
};

// Delete a person by id in the request
exports.delete = (req, res) => {
    console.log(req.params.id);
    getDbPool().query('DELETE FROM `people` WHERE `id`=?', 
        [req.params.id], function (error, results, fields) {
            if (error) {
                return res.status(500).send({
                    message: "Server error"
                });
            }
            res.status(200).send({message : 'Record has been deleted!'});
    });
};