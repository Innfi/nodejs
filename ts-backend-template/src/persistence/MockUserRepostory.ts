import UserRepository from './UserRepository';
import User from '../model/UserEntity';


export class MockUserRepository implements UserRepository {
    protected users: User[] = [];

    public async loadUserEntity(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            const index = this.findUserIndex(id);
            if(index === -1) reject('no user');

            resolve(this.users[index]);
        });
    }

    public async insertUserEntity(newUser: User): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const index = this.findUserIndex(newUser.id);
            if(index !== -1) reject('user exists');

            this.users.push(newUser);

            resolve(true);
        });
    }

    protected findUserIndex(id: string): number {
        return this.users.findIndex(user => user.id === id);
    }
}

