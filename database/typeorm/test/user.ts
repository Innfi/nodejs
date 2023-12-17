import assert  from 'assert';
import { beforeEach } from 'mocha';
import { createConnection, ConnectionOptions, Connection,
    Repository, EntityManager } from 'typeorm';
import { User, UserMetadata } from '../src/user';


describe('typeorm', () => {
    const connectionOption: ConnectionOptions = {
        username: 'innfi',
        password: 'test!password',
        host: '127.0.0.1',
        name: 'user',
        type: 'mysql',
        database: 'ormTest',
        synchronize: true,
        entities: [ UserMetadata, User ]
    };

    let conn: Connection;
    let repoUser: Repository<User>;
    let repoUserMetadata: Repository<UserMetadata>;
    

    beforeEach(async () => {
        conn = await createConnection(connectionOption);
        repoUser = conn.getRepository('user');
        repoUserMetadata = conn.getRepository('user_metadata');
    });

    it('one to one join with transaction', async () => {
        const newUser = new User();
        newUser.name = 'ennfi';
        newUser.email = 'ennfi@test.com';

        const newMetadata: UserMetadata = await conn
        .transaction('SERIALIZABLE', async (manager: EntityManager) => {
            const userResult: User = await manager.save(newUser);

            const metadata = new UserMetadata();
            metadata.created = new Date();
            metadata.stringData = 'data field for metadata';
            metadata.userdata = userResult;

            return await manager.save(metadata);
        });

        const findResult: UserMetadata = await repoUserMetadata.findOne(
            {id: newMetadata.id}
        );

        assert.strictEqual(findResult.userdata.name, newUser.name);
        assert.strictEqual(findResult.userdata.email, newUser.email);
        assert.strictEqual(findResult.created, newMetadata.created);
        assert.strictEqual(findResult.stringData, newMetadata.stringData);
    });
});