import assert from "assert";
import mongoose from 'mongoose';
import isEmpty from 'is-empty';


describe('is-empty', () => {
    it('is working on string', () => {
        assert.strictEqual(isEmpty(''), true);
        assert.strictEqual(isEmpty('not empty'), false);
    });
});

describe('Mongoose', () => {
    //const dbpath = 'mongodb://127.0.0.1/my_database';

    //it('test connect', () => {
    //    mongoose.connect(dbpath, {useNewUrlParser: true, useUnifiedTopology: true})
    //    .then((result) => {
    //        console.log('connections ', result.connection.collections);
    //    });

    //    const db = mongoose.connection;
    //    db.on('err', () => {
    //        console.log('connection error');
    //    });
    //});
});