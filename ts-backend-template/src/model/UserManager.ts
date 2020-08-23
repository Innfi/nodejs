import User from './UserEntity';
//import User from './UserEntity';


class UserManager {
    createUser(id: string): User {
        return new User(id);
    }
}

export default UserManager;