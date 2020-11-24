import mongoose from 'mongoose';
import { stringify } from 'querystring';


class DBAdapter {
    dbConnection: mongoose.Connection;

    constructor(dbPath: string) {
        mongoose.connect(dbPath, { useNewUrlParser: true, useUnifiedTopology: true });

        this.dbConnection = mongoose.connection;
    }

    createTable() {
        const userSchema = new mongoose.Schema({
            userName: String,
            email: String,
            created: Date
        });

        const userModel = mongoose.model('UserModel', userSchema);
        //userModel.
    }

    insertData() {
    }
}