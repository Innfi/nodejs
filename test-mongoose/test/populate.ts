import mongoose, { ConnectionOptions } from 'mongoose';
import assert from 'assert';
const Schema = mongoose.Schema;

const options: ConnectionOptions = {
    useNewUrlParser: true, useUnifiedTopology: true
};

const personSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'stories' }]
});

const storySchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'people' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'people' }]
});

describe('populate', () => {
    it('current: run', async () => {
        const dbUrl: string = 'mongodb://192.168.1.151/users';
        await mongoose.connect(dbUrl, options);

        assert.strictEqual(mongoose.connection.readyState, 
            mongoose.STATES.connected);
        const Story = mongoose.model('stories', storySchema);
        const Person = mongoose.model('people', personSchema);

        //const author = new Person({
        //    _id: new mongoose.Types.ObjectId(),
        //    name: 'aaa',
        //    age: 55
        //})

        //await Person.create(author);

        //const story = new Story({
        //    title: 'bbb',
        //    author: author._id
        //})

        //await Story.create(story);

        const simpleResult = await Story.findOne({ title: 'bbb'});
        assert.strictEqual(simpleResult != null, true);
        const result = await Story
        .findOne({ title: 'bbb'})
        .populate('author', '_id name age')
        console.log('result: ', JSON.stringify(result));

        //assert.strictEqual(result.author.name, 'aaa');
    });
});