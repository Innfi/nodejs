import assert from 'assert';
import mysql from 'mysql2/promise';


describe('DB pool', () => {
    it('test connect', async () => {
        assert.strictEqual(1, 1);
    });

    it('create pool', async () => {
        const poolOptions: mysql.PoolOptions = {
            host: 'localhost',
            database: 'test_user',
            user: 'innfi',
            password: 'test'
        };

        const pool = mysql.createPool(poolOptions);
        assert.strictEqual(pool !== undefined, true);
    });

    it('get connection from pool', async () => {
        const poolOptions: mysql.PoolOptions = {
            host: 'localhost',
            database: 'test_user',
            user: 'innfi',
            password: 'test'
        };

        const pool = mysql.createPool(poolOptions);
        const conn = await pool.getConnection();
        assert.strictEqual(conn !== undefined, true);
    });

    it('get query result using connection', async () => {
        const poolOptions: mysql.PoolOptions = {
            host: 'localhost',
            database: 'test_user',
            user: 'innfi',
            password: 'test'
        };

        const pool = mysql.createPool(poolOptions);
        const conn = await pool.getConnection();

        const options: mysql.QueryOptions = {
            sql: 'SELECT * from user where userId=?',
            values: 'innfi'
        };

        const [rows, fields] = await conn.query(options);
        //TODO: check row count;
        assert.strictEqual(rows !== undefined, true);
    });
});