module.exports = (app) => {
    const people = require('../controllers/people.controller.js');
    // Create a new person
    app.post('/people', people.create);

    // Create a new person
    app.get('/people', people.paginated);
    
    // Retrieve all people
    app.get('/people/all', people.fetchAll);

    // Retrieve a single person by id
    app.get('/people/:id', people.fetchOne);

    // // Update a person with id
    app.put('/people/:id', people.update);

    // // Delete a person by id
    app.delete('/people/:id', people.delete);    
}