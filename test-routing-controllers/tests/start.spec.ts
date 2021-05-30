import 'reflect-metadata';
import { Container } from 'typedi';
import { UserModel } from '../src/UserModel';
import { UserAdapterBase, UserAdapter } from '../src/UserAdapter';
import { UserRepositoryService } from '../src/UserRepositoryService';


describe('typedi test', () => {
    it('instantiate concrete service', async () => {
        const userRepo: UserRepositoryService = Container.get(UserRepositoryService);

        expect(await userRepo.createUser({
            userId: 'innfi', 
            email: 'innfi@test.com',
            passwordHash: '#1234'
        })).toBe(true);
    });
});