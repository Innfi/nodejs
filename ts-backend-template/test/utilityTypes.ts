import assert from 'assert';

interface Todo {
    title: string;
    desc: string;
    thisNumber: number;
    thatString: string;
};

type ScheduleStatus = 'ongoing' | 'done' | 'planned';

interface TodoStatus {
    status: ScheduleStatus;
};

const evaluateTodo = (
    input: Readonly<Todo>,
    testNumber: number,
    thatString: string,
): TodoStatus => {
    return {
        status: 'done',
    };
};

describe('type testing', () => {
    const todoFirst: Todo = {
        title: 'witcher', 
        desc: 'season 2',
        thisNumber: 1217,
        thatString: 'coming up next',
    };

    it('calls partial params', () => {
        const updateTodo = (todo: Todo, fieldsToUpdate: Partial<Todo>) => {
            return { ...todo, ...fieldsToUpdate };
        };

        const todo2: Todo = updateTodo(todoFirst, { 
            desc: 'netflix series',
            thisNumber: 2,
        });

        assert.strictEqual(todo2.thisNumber, 2);
    });

    it('readonly', () => {
        const result: Readonly<TodoStatus> = evaluateTodo(todoFirst, 0, '');
        assert.strictEqual(result.status, 'done');
    });

    it('record', () => {
        interface CatInfo {
            age: number;
            breed: string;
        };

        type CatName = 'miffy' | 'boris' | 'mord';
        const cats: Record<CatName, Readonly<CatInfo>> = {
            miffy: { age: 1, breed: 'black n white' },
            boris: { age: 2, breed: 'munch' },
            mord: { age: 3, breed: 'koshort' },
        };

        assert.strictEqual(cats.boris.age, 2);
        const testAray: string[] = [];

        console.log(`t: ${Array.isArray(testAray)}`);
    });

    it('picks and mix', () => {
        interface UserInternal {
            userId: string;
            authKey: string;
            name: string;
        };

        interface UserExternal {
            publicId: number;
            email: string;
        };

        type UserPublicProfile = 
            Pick<UserInternal, 'name'> & 
            Pick<UserExternal, 'email'>;

        const profile: Readonly<UserPublicProfile> = {
            name: 'innfi',
            email: 'innfi@test.com',
        };

        assert.strictEqual(profile.name, 'innfi');
    });

    it('parameters', () => {
        type FromParametersType = Parameters<typeof evaluateTodo>;

        const instantiated: FromParametersType = [
            todoFirst, 2, 'innfi'
        ];

        assert.strictEqual(evaluateTodo(...instantiated).status, 'done');
    });

    it('return type', () => {
        type T3 = ReturnType< <T extends U, U extends number[]>() => T >;

        let assigned: T3 = [];
        assert.strictEqual(Array.isArray(assigned), true);
    });

    it('capitalize', () => {
        type HeaderCandidate = 'hit' | 'this' | 'clean' | 'or';
        type HeaderDesc = Capitalize<HeaderCandidate>;

        const casted: HeaderDesc = 'Hit';
    });

    it('uppercase', () => {
        type HeaderCandidate = 'hit' | 'this' | 'clean' | 'or';
        type Intensified = Uppercase<HeaderCandidate>;

        const popIt: Intensified = 'CLEAN';        
    });

    it('extracting', () => {
        interface Lion { meow(): void; };
        interface Zebra {};
        interface Tiger { meow(): void; };
        interface Shark {};

        type Animal = Lion | Zebra | Tiger | Shark;
        type ExtractCat<A> = A extends { meow(): void } ? A : never;

        type Cats = ExtractCat<Animal>;
    });
});