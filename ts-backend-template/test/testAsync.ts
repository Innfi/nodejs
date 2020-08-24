import assert from 'assert';

describe('Async', () => {
    it('test async / await with promise', async () => {
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
