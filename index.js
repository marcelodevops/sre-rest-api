//importing express library
const express = require('express');
//creating express app
const app = express();

// importing body parser and link it to the express app
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//port definition, if environment variable is undefined use default to 8082
const port = process.env.PORT || 8082;

//root directory get request route handler for testing
app.get('/', async (req, res) => {
    res.json({ status: 'API is ready'});
});

//import required routes
require('./app/routes/people.routes.js')(app);

//start listening on defined port
app.listen(port, () => {
  console.log('REST API listening on port ', port);
});