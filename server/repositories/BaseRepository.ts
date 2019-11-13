import { createConnection, Connection } from 'mysql';

export class BaseRepository {
    protected async getConn() : Promise<Connection>{
        let p = new Promise<Connection>((resolve,reject) =>{
            let conn = createConnection({
                host     : 'localhost',
                user     : 'discsadmin',
                password : 'abc123',
                database : 'DiscManager'
            });
    
            conn.connect();
    
            resolve(conn);
        })

        return p;
    }
}