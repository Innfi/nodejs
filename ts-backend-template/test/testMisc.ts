import assert from 'assert';

describe('Array', () => {
    const testArray: string[] = [
        'august', 'september', 'october'
    ];

    it('indexOf', () => {
        assert.equal(testArray.indexOf('september'), 1);
        assert.equal(testArray.indexOf('november'), -1);
    });

    it('findIndex', () => {
        assert.equal(testArray.findIndex(element => element === 'september'), 1);
        assert.equal(testArray.findIndex(element => element === 'november'), -1);
    });
});

describe('Async', () => {
    it('async / await with promise', async () => {
        const testFunction = async (): Promise<string> => {
            const promiseResult: Promise<string> = new Promise((resolve) => {
                resolve('test');
            });

            const test = promiseResult.then((result) => {
                return result;
            }).catch((err) => {
                return 'error';
            }).finally(() => { 
                return 'finally';
            });

            return test;
        };

        try {
            const result = await testFunction();

            assert.equal(result, 'test');
        } catch(e) {
            console.log(e);
        }
    });
});