module.exports = (app) => {
    const people = require('../controllers/people.controller.js');
    // Create a new person
    // app.post('/people', people.create);

    // Retrieve all people
    app.get('/people', people.findAll);

    // // Retrieve a single person by id
    // app.get('/people/:id', people.findOne);

    // // Update a person with id
    // app.put('/people/:id', people.update);

    // // Delete a person by id
    // app.delete('/people/:id', people.delete);    
}