//import libraries

const express = require('express');
const app = express();

const mysql = require('mysql');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = process.env.PORT || 8082;

app.listen(port, () => {
  console.log('REST API listening on port ', port);
});