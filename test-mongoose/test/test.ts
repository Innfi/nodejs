import mongoose from 'mongoose';
import assert from 'assert';
import { IUserInfo, UserSchema } from '../src/model';


describe('mongoose test', () => {
    it('init client', async () => {
        await mongoose.connect('mongodb://localhost', 
            { useNewUrlParser: true, useUnifiedTopology: true});

        assert.strictEqual(mongoose.connection.readyState, 
            mongoose.STATES.connected);
    });

    it('init model', async () => {
        await mongoose.connect('mongodb://localhost', 
            { useNewUrlParser: true, useUnifiedTopology: true});

        const userModel = mongoose.model<IUserInfo>('user', UserSchema);
    });

    // create / update / delete 
    // read: projection
    // population

});