import { Schema, Document } from "mongoose";


export interface IUserAccount extends Document {
    nickname: string;
    email: string;
    created: Date;
    loggedIn?: Date;
    loggedOut?: Date;
};

export const UserAccountSchema = new Schema({
    nickname: { type: String }, 
    email: { type: String, index: true },
    created: { type: Number },
    loggedIn: { type: Number },
    loggedOut: { type: Number },
}, { collection: 'User'});
