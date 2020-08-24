import assert from 'assert';
import User from '../src/model/UserEntity';
import UserManager from '../src/model/UserManager';
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

    it('timeout for insert / load User entity ', async() => {

    });
});

/*
describe('UserManager', () => {
    it('creates User entity', () => {
        const userManager = new UserManager();

        const id: string = 'innfi';
        const entity = userManager.createUser(id);

        assert.equal(entity.id, id);
    });
});
*/