import assert from 'assert';
import User from '../src/model/UserEntity';
import UserManager from '../src/UserManager';
import { MockUserRepository } from '../src/persistence/MockUserRepostory';


describe("User", () => {
    it('has id', () => {
        const dummyUser = new User();
        assert.equal(dummyUser.id, '');
    });

    it('has email', () => {
        const dummyUser = new User();
        assert.equal(dummyUser.email, '');
    });
});

describe('UserRepository', () => {
    it('insert / load User entity', async () => {
        const userRepository = new MockUserRepository();
        const testUser = new User('innfi', 'innfi.world@gmail.com');

        const loadUserResult = await userRepository.insertUserEntity(testUser);
        assert.equal(loadUserResult, true); 

        const resultUser = await userRepository.loadUserEntity(testUser.id);
        assert.equal(testUser.equals(resultUser), true);
    });
});


describe('UserManager', () => {
    it('creates User entity', async () => {
        const userManager = new UserManager(new MockUserRepository());
        const id: string = 'innfi';

        const user = await userManager.createUser(id);
        assert.equal(user.id, id);
    });
});
