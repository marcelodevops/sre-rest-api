const request = require('supertest')
const app = require('../index')


/**
 * Testing get all people endpoint
 */

describe('GET /people/all', function () {
    it('respond with json containing a list with all the people', function (done) {
        request(app)
            .get('/people/all')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing post people endpoint
 */
describe('POST /people', function () {
    let data = {
        "rut": "11111111-1",
        "name": "dummy",
        "lastname": "fortest",
        "age": 33,
        "course": "Chemistry"
    }
    it('respond with 201 created', function (done) {
        request(app)
            .post('/people')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});