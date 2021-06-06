import mongoose from 'mongoose';
import { IUserInfo, UserSchema }  from './users';

export default class UserAdapter {
    url: string
    connection: mongoose.Connection;
    model: mongoose.Model<any> = undefined;
    connectOptions: mongoose.ConnectionOptions = {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false
    };

    constructor(url: string) {
        this.url = url;
    }

    async connectToDB(): Promise<void> {
        this.connection = await mongoose.createConnection(this.url, this.connectOptions);
    }

    isConnected(): boolean {
        return this.connection.readyState == mongoose.ConnectionStates.connected;
    }

    async createUser(email: string, passwd: string): Promise<boolean>{
        if(this.model.findOne({email: email}) != null) return false;

        const newUserdata: object = {
            email: email,
            passwd: passwd
        };
       
        await this.model.create(newUserdata); //TODO: other error cases

        return true;
    }

    async loadUser(email: string): Promise<IUserInfo | null> {
        if(this.model === undefined) this.model = this.connection.model('testusers', UserSchema);

        return await this.model.findOne({ email: email});
    }
}