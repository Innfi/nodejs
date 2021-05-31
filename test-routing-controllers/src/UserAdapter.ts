import 'reflect-metadata';
import { Service } from 'typedi';
import { UserModel } from './UserModel';

interface UserDict {
    [id: string]: UserModel;
}

export interface UserAdapterBase {
    loadUser(email: string): Promise<UserModel>;

    createUser(input: UserModel): Promise<boolean>;

    getName(): string;
}

@Service() 
export class UserAdapter implements UserAdapterBase {
    constructor() {}

    protected userDict: UserDict = {};

    async loadUser(email: string): Promise<UserModel> {
        return this.userDict[email];
    }

    async createUser(input: UserModel): Promise<boolean> {
        if(this.userDict[input.email] !== undefined) return false;

        this.userDict[input.email] = input;
        return true;
    }

    getName(): string { return 'userAdapter'; }
}

@Service()
export class MockUserAdapter implements UserAdapterBase {
    constructor() {}
    
    async loadUser(email: string): Promise<UserModel> {
        return {
            userId: 'dummy',
            email: email,
            passwordHash: '#1234'
        };
    }

    async createUser(input: UserModel): Promise<boolean> {
        return false;
    }

    getName(): string { return 'mockUserAdapter'; }
}
