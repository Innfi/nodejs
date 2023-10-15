import User from './model/UserEntity';
import UserRepository from './persistence/UserRepository';


class UserManager {
    protected userRepo: UserRepository;

    constructor(repo: UserRepository) {
        this.userRepo = repo;
    }

    async loadUser(id: string): Promise<User> {
        return await this.userRepo.loadUserEntity(id);
    }

    async createUser(id: string): Promise<User> {
        this.userRepo.insertUserEntity(new User(id));

        return await this.userRepo.loadUserEntity(id);
    }
}

export default UserManager;