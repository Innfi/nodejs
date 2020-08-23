import User from '../model/UserEntity';


interface UserRepository {
    loadUserEntity(id: string): User;
    insertUserEntity(user: User): boolean;
}

export default UserRepository;