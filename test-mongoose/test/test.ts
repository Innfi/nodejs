import mongoose, { ConnectionOptions, PaginateModel,
    PaginateOptions, FilterQuery, Types } from 'mongoose';
import assert from 'assert';
import { IUserAccount, UserAccountSchema, IInventory, InventorySchema,
    InvenPaginateSchema, IFriends, FriendsSchema } from '../src/model';


describe('mongoose test', () => {
    const dbUrl: string = 'mongodb://192.168.1.151/users';
    const invenDbUrl: string = 'mongodb://192.168.1.151/invens';
    const options: ConnectionOptions = {
        useNewUrlParser: true, useUnifiedTopology: true
    };
    const collectionUserAccount: string = 'userAccount';
    let userModel: mongoose.Model<IUserAccount, {}>;

    //before(async () => {
    //    await mongoose.connect(dbUrl, options);
    //});

    //after(async() => {
    //    try {
    //        mongoose.deleteModel('userModel');
    //        await mongoose.connection.dropCollection(collectionUserAccount);
    //    } catch (err) {

    //    }
    //});

    it('basic create / find', async () => {
        assert.strictEqual(mongoose.connection.readyState, 
            mongoose.STATES.connected);

        userModel = mongoose.model<IUserAccount>(
               collectionUserAccount, UserAccountSchema);
        
        await userModel.create({
            nickname: 'innfi',
            email: 'innfi@ennfi.com',
            created: new Date()
        });

        const findResult: IUserAccount[] = await userModel.find({ nickname: 'innfi' });

        assert.strictEqual(findResult.length, 1);
        assert.strictEqual(findResult[0].nickname, 'innfi');
    });

    it('find with projection', async () => {
        userModel = mongoose.model<IUserAccount>(
               collectionUserAccount, UserAccountSchema);
       
        await userModel.create({
            nickname: 'innfi',
            email: 'innfi@test.com',
            created: new Date()
        });
        
        await userModel.create({
            nickname: 'ennfi',
            email: 'ennfi@test.com',
            created: new Date()
        });

        const projection: string = 'nickname';
        const result: IUserAccount | null = await userModel.findOne(
            { email: 'innfi@test.com'}, projection);

        assert.strictEqual(result != null, true);
        assert.strictEqual(result?.nickname, 'innfi');
        assert.strictEqual(result?.email, undefined);
        assert.strictEqual(result?.created, undefined);
    });

    it('multi connection with createConnection', async() => {
        const accountConnection: mongoose.Connection = await mongoose.createConnection(
            dbUrl, options);
        const invenConnection: mongoose.Connection = await mongoose.createConnection(
            invenDbUrl, options);

        assert.strictEqual(accountConnection.readyState, mongoose.STATES.connected);
        assert.strictEqual(invenConnection.readyState, mongoose.STATES.connected);

        userModel = accountConnection.model<IUserAccount, mongoose.Model<IUserAccount>>(
            collectionUserAccount, UserAccountSchema);
        const invenModel = invenConnection.model<IInventory, mongoose.Model<IInventory>>(
            'inventory', InventorySchema);
        assert.strictEqual(accountConnection.models['inventory'], undefined);
        assert.strictEqual(invenConnection.models['userAccount'], undefined);
    });
    
    it('pagination', async () => {
        const invenConnection: mongoose.Connection = await mongoose.createConnection(
            dbUrl, options);
        const invenModel: PaginateModel<IInventory> = 
            invenConnection.model<IInventory, PaginateModel<IInventory>>('inventory', 
            InvenPaginateSchema);

        const paginateQuery: FilterQuery<IInventory> = {
            $or: [
                { testElement1: { $gt: 0} },
                { testElement3: { $lt: 0} }
            ]
        };
        const paginateOptions: PaginateOptions = {
            page: 1,
            limit: 20
        };

        const findResult: mongoose.PaginateResult<IInventory> = 
            await invenModel.paginate(paginateQuery, paginateOptions);
        assert.strictEqual(findResult.hasNextPage, true);

        const docs: IInventory[] = findResult.docs;
        assert.strictEqual(docs.length, paginateOptions.limit);
    });

    it('insert userAccounts', async () => {
        const accountConnection: mongoose.Connection = 
            await mongoose.createConnection(dbUrl, options);

        userModel = accountConnection.model<IUserAccount>(
            collectionUserAccount, UserAccountSchema);
        await userModel.create({
            nickname: 'innfi',
            email: 'innfi@test.com',
            created: new Date()
        });
        await userModel.create({
            nickname: 'ennfi',
            email: 'ennfi@test.com',
            created: new Date()
        });
        await userModel.create({
            nickname: 'milli',
            email: 'milli@test.com',
            created: new Date()
        });
    });

    it('insert friends', async () => {
        const friendConnection: mongoose.Connection = await mongoose.createConnection(
            dbUrl, options);
        const friendModel: mongoose.Model<IFriends> = 
            friendConnection.model<IFriends>('friends', FriendsSchema);

        await friendModel.create({
            email: 'innfi@test.com',
            friends: [ Types.ObjectId("5fc63ec68a6c191c78d982fa"),
                Types.ObjectId("5fc63ec68a6c191c78d982fb") ]
        });
    });

    it('population', async() => {
        //const friendConnection: mongoose.Connection = await mongoose.createConnection(
        //    dbUrl, options);
        //const friendModel: mongoose.Model<IFriends> = 
        //    friendConnection.model<IFriends>('friends', FriendsSchema);

        //await friendModel.findOne({ name: 'innfi' }).populate('friends')
        //.then((value: IFriends) => {
        //    if(value.friends instanceof Types.ObjectId) {
        //        assert.fail();
        //    } else {
        //    }
        //});
    });
});