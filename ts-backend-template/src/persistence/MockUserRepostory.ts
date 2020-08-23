import UserRepository from './UserRepository';
import User from '../model/UserEntity';


export class MockUserRepository implements UserRepository {
    private users: User[] = [];

    loadUserEntity(id: string) {
        let resultUser = new User();

        this.users.forEach(user => {
            console.log('user: ', user.id);
            if(user.id === id) {
                resultUser = user;
                return;
            }
        });

        return resultUser;
    }

    insertUserEntity(newUser: User) {
        const resultUser = this.users.find(user => user.id === newUser.id);
        if(resultUser !== undefined) return false;

        this.users.push(newUser);

        return true;
    }
}

