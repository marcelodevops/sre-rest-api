module.exports = (app) => {
    const people = require('../controllers/people.controller.js');
    // Create a new person
    app.post('/people', people.create);

    // Get a paginated list of users
    app.get('/people', people.paginated);
    
    // Fetch all people
    app.get('/people/all', people.fetchAll);

    // Fetch a single person by id
    app.get('/people/:id', people.fetchOne);

    // // Update a person by id
    app.put('/people/:id', people.update);

    // // Delete a person by id
    app.delete('/people/:id', people.delete);    
}