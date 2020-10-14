import mongoose from 'mongoose';
const Schema = mongoose.Schema;


interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    date: Date;
}

export const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model<IUser>('users', UserSchema);

export default User;