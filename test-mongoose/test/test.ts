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

    // population

    // create / update / delete 
});