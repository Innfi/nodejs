import { createKoaServer } from 'routing-controllers';
import { UserController } from '../src/UserControllerKoa';
import supertest from 'supertest';
import http from 'http';


const app = createKoaServer({
    controllers: [ UserController]
});


describe('routing controllers', () => {
    let server: http.Server;
    let apptest;

    beforeAll((done) => {
        server = http.createServer(app);
        server.listen(done);
        apptest = supertest(server);
    });

    afterAll(done => {
        server.close(done);
    });

    it('simple get', () => {
        apptest
        .get('/user/1234')
        .expect(200)
        .end();
    });
});