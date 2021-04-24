import mongoose from 'mongoose';
import { IUserInfo, UserSchema, connectOptions }  from './users';

let model: mongoose.Model<any>;
mongoose.createConnection ('mongodb://localhost/passdb', connectOptions)
.then((connection: mongoose.Connection) => {
    console.log('db connected');
    model = connection.model('testusers', UserSchema);
});

export default model;