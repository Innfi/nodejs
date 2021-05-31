import 'reflect-metadata';
import { Container } from 'typedi';
import { UserModel } from '../src/UserModel';
import { UserAdapterBase, UserAdapter } from '../src/UserAdapter';
import { UserRepositoryFactory, UserRepositoryService } from '../src/UserRepositoryService';


describe('typedi test', () => {
    const factory = new UserRepositoryFactory();
    it('instantiate concrete service', async () => {

        //const userRepo: UserRepositoryService = Container.get(UserRepositoryService);
        const userRepo: UserRepositoryService = factory.createRepository();
        expect(userRepo.getName()).toBe('userAdapter');

        expect(await userRepo.createUser({
            userId: 'innfi', 
            email: 'innfi@test.com',
            passwordHash: '#1234'
        })).toBe(true);
    });

    it('instantiate concrete service with Container.get()', async () => {
        const userRepo: UserRepositoryService = Container.get(UserRepositoryService);
        expect(userRepo.getName()).toBe('userAdapter');

        expect(await userRepo.createUser({
            userId: 'innfi', 
            email: 'innfi@test.com',
            passwordHash: '#1234'
        })).toBe(true);
    });

    it('instantiate service with mock object', async () => {
        const mockUserRepo: UserRepositoryService = factory.createMockRepository();
        expect(mockUserRepo.getName()).toBe('mockUserAdapter');

        expect(await mockUserRepo.createUser({
            userId: 'ennfi',
            email: 'ennfi@test.com',
            passwordHash: '#43454'
        })).toBe(false);
    });
});