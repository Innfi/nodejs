import 'reflect-metadata';
import { Service, Container } from 'typedi';
import { UserAdapterBase, UserAdapter, MockUserAdapter } from './UserAdapter';
import { UserModel } from './UserModel';

@Service()
export class UserRepositoryFactory {
    createMockRepository(): UserRepositoryService {
        return new UserRepositoryService(new MockUserAdapter());
    }

    createRepository(): UserRepositoryService {
        return new UserRepositoryService(new UserAdapter());
    }
}

@Service({ factory: [ UserRepositoryFactory, 'createRepository']})
export class UserRepositoryService {
    constructor(private adapter: UserAdapterBase) { }

    async loadUser(email: string): Promise<UserModel> {
        return this.adapter.loadUser(email); //try catch? 
    }

    async createUser(input: UserModel): Promise<boolean> {
        return this.adapter.createUser(input);
    }

    getName(): string { return this.adapter.getName(); }
}
