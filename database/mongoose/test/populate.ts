import mongoose, { ConnectionOptions } from 'mongoose';
import assert from 'assert';
import { Types } from 'mongoose';
const Schema = mongoose.Schema;

const options: ConnectionOptions = {
    useNewUrlParser: true, useUnifiedTopology: true
};

interface IPeople extends Document {
  _id: Types.ObjectId;
  name: string;
  age: number;
  stories: Types.ObjectId;
};

const personSchema = new Schema<IPeople>({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'stories' }]
}, { collection: 'people'});

interface IStory extends Document {
  author: Types.ObjectId | IPeople;
  title: string;
  fans: Types.ObjectId[];
};

const storySchema = new Schema<IStory>({
  author: { type: Schema.Types.ObjectId, ref: 'people' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'people' }]
}, { collection: 'stories' });

describe('populate', () => {
    const dbUrl: string = 'mongodb://localhost/users';
    it('run', async () => {
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

        const result: IStory = 
          await Story.findOne({ title: 'bbb'}).populate('author');
        console.log('result: ', JSON.stringify(result));

        const testAuthor = result.author;
        assert.strictEqual(testAuthor['name'], 'aaa');
    });
});