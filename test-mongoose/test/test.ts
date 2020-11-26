import mongoose from 'mongoose';
import assert from 'assert';
import { IUserInfo, UserSchema } from '../src/model';


describe('mongoose test', () => {
    it('init client', async () => {
        await mongoose.connect('mongodb://localhost/userdb', 
            { useNewUrlParser: true, useUnifiedTopology: true});

        assert.strictEqual(mongoose.connection.readyState, 
            mongoose.STATES.connected);
    });

    it('init model', async () => {
        await mongoose.connect('mongodb://localhost/userdb', 
            { useNewUrlParser: true, useUnifiedTopology: true});

        const userModel = mongoose.model<IUserInfo>('user', UserSchema);
    });

    // read: projection
    it('find element in object', async() => {
        await mongoose.connect('mongodb://localhost/userdb', 
            { useNewUrlParser: true, useUnifiedTopology: true});

        const userModel = mongoose.model<IUserInfo>('user', UserSchema);

        //todo: create collection / insert dummy docs
        userModel.findOne({_id: 'innfi', 'inventory.itemType':'weapon'}, 
        (err: any, res: IUserInfo) => {
            assert.strictEqual(res.nickname, 'innfi');
        });
    });

    it('multi connection with createConnection', async () => {
        const conn: mongoose.Connection = await mongoose.createConnection(
            'mongodb://localhost/userdb', { useNewUrlParser: true, useUnifiedTopology: true} );
        assert.strictEqual(conn.readyState, mongoose.STATES.connected);
        assert.deepStrictEqual(conn.models, {});

        const userModel: mongoose.Model<IUserInfo> = conn.model<IUserInfo>('user', UserSchema);

        assert.strictEqual(conn.models['user'] != undefined, true);
    });

    //multi connection with paginate middleware

    // population

    // create / update / delete 
});