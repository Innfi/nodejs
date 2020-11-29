import { Schema, Document } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


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
}, { collection: 'userAccount'});

export interface IInventory extends Document {
    email: string;
    testElement1: number;
    testElement2: string;
    testElement3: number;
};

export const InventorySchema = new Schema<IInventory>({
    email: { type: String, index: true },
    testElement1: { type: Number }, 
    testElemen12: { type: String },
    testElement3: { type: Number }
}, { collection: 'inventory'});

export const InvenPaginateSchema = InventorySchema.plugin(mongoosePaginate);