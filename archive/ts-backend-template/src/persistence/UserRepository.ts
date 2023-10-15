import User from '../model/UserEntity';


interface UserRepository {
    loadUserEntity(id: string): Promise<User>;
    insertUserEntity(user: User): Promise<boolean>;
}

export default UserRepository;