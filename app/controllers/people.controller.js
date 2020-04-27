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
            res.status(200).type('application/json').send(JSON.stringify(results));
        });
};

// Retrieve and return all people from the database.
exports.paginated = (req, res) => {
    var numRows;
    var queryPagination;
    var numPerPage = parseInt(req.query.npp, 10) || 1;
    var page = parseInt(req.query.page, 10) || 0;
    var numPages;
    var skip = page * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
    var limit = skip + ',' + numPerPage;
    getDbPool().query('SELECT * FROM people',
        function (error, results, fields) {
            if (error) {
                return res.status(500).send({
                    message: "Server error"
                });
            }
            numRows = results[0].numRows;
            numPages = Math.ceil(numRows / numPerPage);
            
        });
        getDbPool().query('SELECT * FROM people ORDER BY id ASC LIMIT ' + limit,
        function (error, results, fields) {
            if (error) {
                return res.status(500).send({
                    message: "Server error"
                });
            }
            var resPayload = {
                results: results
            }
            if (page < numPages) {
                resPayload.pagination = {
                  current: page,
                  perPage: numPerPage,
                  previous: page > 0 ? page - 1 : undefined,
                  next: page < numPages - 1 ? page + 1 : undefined
                }
              }
              else resPayload.pagination = {
                err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
              }
              if (error) {
                return res.status(500).send({
                    message: "Server error"
                });
            }
            res.status(200).type('application/json').
            set('Accept', 'application/json').
            send(JSON.stringify(resPayload));
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
            console.log(results);
            if (results.length<1) {
                return res.status(404).send({
                    message: "Resource not found"
                });
            }
            res.status(200).
            type('application/json').
            set('Accept', 'application/json').
            send(JSON.stringify(results[0]));
        });
};

// Add a new person
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Invalid data, RUT can not be empty"
        });
    }
    if (!req.accepts('application/json')) {
        return res.status(406).send({
            message: "Invalid json format"
        });
    }
    const params = req.body;
    console.log(params);

    getDbPool().query("INSERT INTO people SET ? ", params,
        function (error, results, fields) {
            if (error) {
                return res.status(500).send({
                    message: "Server error"
                });
            }
            return res.status(200).type('application/json').send({
                data: results,
                message: 'Success. New person has been added.'
            });
        });
};


exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Invalid data, content can not be empty"
        });
    }
    if (!req.accepts('application/json')) {
        return res.status(406).send({
            message: "Invalid json format"
        });
    }
    console.log(req.params.id);
    console.log(req.body.rut);
    getDbPool().query('UPDATE `people` SET ? where `id`=?',
        [req.body, req.params.id],
        function (error, results, fields) {
            if (error) {
                return res.status(500).send({
                    message: "Server error"
                });  
            }
            if (results.affectedRows == 0) {
                return res.status(404).send({
                    message: "Resource not found"
                });   
            }
            res.status(201).type('application/json').
            send(JSON.stringify(results));
        });
};

// Delete a person by id in the request
exports.delete = (req, res) => {
    console.log(req.params.id);
    getDbPool().query('DELETE FROM `people` WHERE `id`=?', 
        [req.params.id], function (error, results, fields) {
            if (error) {
                return res.status(500).send({
                    message: "Server error ocurre while deleting a person"
                });
            }
            if (results.affectedRows == 0) {
                return res.status(404).send({
                    message: "Resource not found"
                });
                
            }
            res.status(200).send({message : 'Record has been deleted!'});
    });
};