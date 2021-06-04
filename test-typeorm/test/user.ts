import assert  from 'assert';
import { beforeEach } from 'mocha';
import { createConnection, ConnectionOptions, Connection,
    Repository } from 'typeorm';
import { User } from '../src/user';


describe('typeorm', () => {
    const connectionOption: ConnectionOptions = {
        username: 'innfi',
        password: 'test!password',
        host: '127.0.0.1',
        name: 'user',
        type: 'mysql',
        database: 'ormTest',
        synchronize: true,
        entities: [ User ]
    };

    let conn: Connection;
    let repo: Repository<User>;
    

    beforeEach(async () => {
        conn = await createConnection(connectionOption);
        repo = conn.getRepository('user');
    });

    afterEach(async () => {
        await repo.query('delete from user');
    });

    it('basic create/select', async () => {
        const newUser = new User();
        newUser.name = 'innfi';
        newUser.email = 'test@test.com';

        const createResult: User = await repo.save(newUser);
        assert.strictEqual(createResult.id !== undefined, true);

        const findResult: User = await repo.findOne(createResult.id);
        assert.strictEqual(findResult.name, newUser.name);
        assert.strictEqual(findResult.email, newUser.email);
    });

    it('one to one join', async () => {

    });
});