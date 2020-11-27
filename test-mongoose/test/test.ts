import mongoose, { ConnectionOptions } from 'mongoose';
import assert from 'assert';
import { IUserAccount, UserAccountSchema } from '../src/model';


describe('mongoose test', () => {
    const dbUrl: string = 'mongodb://192.168.1.171/users';
    const options: ConnectionOptions = {
        useNewUrlParser: true, useUnifiedTopology: true
    };
    const collectionUserAccount: string = 'userAccount';
    let userModel: mongoose.Model<IUserAccount, {}>;

    before(async () => {
        await mongoose.connect(dbUrl, options);
    });

    after(async() => {
        try {
            mongoose.deleteModel('userModel');
            await mongoose.connection.dropCollection(collectionUserAccount);
        } catch (err) {

        }
    });

    it('basic create / find', async () => {
        assert.strictEqual(mongoose.connection.readyState, 
            mongoose.STATES.connected);

        userModel = mongoose.model<IUserAccount>(
               collectionUserAccount, UserAccountSchema);
        
        await userModel.create({
            nickname: 'innfi',
            email: 'innfi@ennfi.com',
            created: new Date()
        });

        const findResult: IUserAccount[] = await userModel.find({ nickname: 'innfi' });

        assert.strictEqual(findResult.length, 1);
        assert.strictEqual(findResult[0].nickname, 'innfi');
    });

    it('current: find with projection', async () => {
        userModel = mongoose.model<IUserAccount>(
               collectionUserAccount, UserAccountSchema);
       
        await userModel.create({
            nickname: 'innfi',
            email: 'innfi@test.com',
            created: new Date()
        });
        
        await userModel.create({
            nickname: 'ennfi',
            email: 'ennfi@test.com',
            created: new Date()
        });

        const projection: string = 'nickname';
        const result: IUserAccount | null = await userModel.findOne(
            { email: 'innfi@test.com'}, projection);

        assert.strictEqual(result != null, true);
        assert.strictEqual(result?.nickname, 'innfi');
        assert.strictEqual(result?.email, undefined);
        assert.strictEqual(result?.created, undefined);
    });

    /*
    it('multi connection with createConnection', async () => {
        const conn: mongoose.Connection = await mongoose.createConnection(
            'mongodb://localhost/userdb', { useNewUrlParser: true, useUnifiedTopology: true} );
        assert.strictEqual(conn.readyState, mongoose.STATES.connected);
        assert.deepStrictEqual(conn.models, {});

        const userModel: mongoose.Model<IUserInfo> = conn.model<IUserInfo>('user', UserSchema);

        assert.strictEqual(conn.models['user'] != undefined, true);
    });
    */
    //multi connection with paginate middleware

    // population

    // create / update / delete 
});