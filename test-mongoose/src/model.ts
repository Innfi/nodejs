import { Schema, Document } from "mongoose";


export interface IUserInfo extends Document {
    _id: string;
    nickname: string;
    email: string;
    created: Date;
    loggedIn: Date;
    loggedOut: Date;
};

export const UserSchema = new Schema({
    _id: { type: String },
    nickname: { type: String }, 
    email: { type: String },
    created: { type: Number },
    loggedIn: { type: Number },
    loggedOut: { type: Number },
}, { collection: 'User'});
