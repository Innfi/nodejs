import 'reflect-metadata';
import { Service, Container } from 'typedi';
import { UserAdapterBase, UserAdapter } from './UserAdapter';
import { UserModel } from './UserModel';


@Service()
export class UserRepositoryService {
    constructor(private adapter: UserAdapterBase) { }

    async loadUser(email: string): Promise<UserModel> {
        return this.adapter.loadUser(email); //try catch? 
    }

    async createUser(input: UserModel): Promise<boolean> {
        return this.adapter.createUser(input);
    }
}