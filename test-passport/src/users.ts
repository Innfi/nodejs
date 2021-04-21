import mongoose, { Schema, Document } from 'mongoose';


export interface IUserInfo extends Document {
    //_id?: string;
    email: string;
    passwd: string;
    data?: string;
};

export const UserSchema = new Schema({
    //_id: { type: String },
    email: { type: String, index: { unique: true } },
    passwd: { type: String },
    data: { type: String }
}, { collection: 'testusers'});

export const connectOptions: mongoose.ConnectionOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
};

