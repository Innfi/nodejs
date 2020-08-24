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