import mysql from 'mysql2/promise';


type DBDict = { [id: string]: mysql.Pool };

export class DatabasePool {
    protected dbDict: DBDict;


    public constructor() {
        this.dbDict = {};
    }

    public registerDatabase(dbName: string, pool: mysql.pool): void {
        //TODO: load db connection info from outside
        
        this.dbDict[dbName] = pool;       
    }
};