import { Disc } from '../domain/Disc';
import { BaseRepository } from './BaseRepository';
import { ObjectNotFoundException } from './ObjectNotFoundException';

export class DiscRepository extends BaseRepository{
    add(disc : Disc) : Promise<Disc>{
        let p = new Promise<Disc>(async (resolve, reject) =>{
            let conn = await this.getConn();

            conn.query("INSERT INTO Disc (name,year) VALUES (?, ?)", 
            [disc.Name, disc.Year], 
            (error, results, fields) =>{
                if(error) {
                    reject(error);
                    return;
                }

                disc.Id = results.insertId;
                resolve(disc);
            });

            conn.end();
        });

        return p;
    }

    update(disc: Disc) : Promise<Disc>{
        let p = new Promise<Disc>(async (resolve, reject) =>{
            let conn = await this.getConn();
            conn.query("UPDATE Disc SET name = ?, year = ? WHERE id = ?", [disc.Name, disc.Year, disc.Id], 
            (error, results, fields) =>{
                if(error) {
                    reject(error);
                    return;
                }

                resolve(disc);
            });

            conn.end();
        });

        return p;
    }

    getById(id : number) : Promise<Disc>{
        let p = new Promise<Disc>(async (resolve, reject) =>{
            let conn = await this.getConn();
            conn.query("SELECT id, name, year FROM Disc WHERE id = ?",[id], 
            (error, results, fields) =>{
                if(error) {
                    reject(error);
                    return;
                }

                if(results.length < 1)
                    reject(new ObjectNotFoundException(`O disco de id ${id} não existe no banco de dados.`));

                let r = results[0];
                let d = new Disc(r.name, r.year);
                d.Id = r.id;

                resolve(d);
            });

            conn.end();
        });
        
        return p;
    }

    getByIds(ids :number[]) : Promise<Disc[]>{
        let p = new Promise<Disc[]>(async (resolve, reject) =>{
            let conn = await this.getConn();

            conn.query("SELECT id, name, year FROM Disc WHERE id in (?)", [ids],
            (error, results, fields) =>{
                if(error) {
                    reject(error);
                    return;
                }

                let discs : Disc[] = [];

                for(let i = 0; i < results.length; i++){
                    let r = results[i];
                    let d = new Disc(r.name, r.year);
                    d.Id = r.id;

                    discs.push(d);
                }

                resolve(discs);
            });

            conn.end();
        });
        
        return p;
    }

    getByDiscCollection(collectionId : number) : Promise<Disc[]>{
        let p = new Promise<Disc[]>(async (resolve, reject) =>{
            let conn = await this.getConn();

            conn.query("SELECT d.id, d.name, d.year FROM Disc d JOIN Disc_DiscCollection ddc ON d.id = ddc.disc_id WHERE ddc.disc_collection_id = ?", [collectionId],
            (error, results, fields) =>{
                if(error) {
                    reject(error);
                    return;
                }

                let discs : Disc[] = [];

                for(let i = 0; i < results.length; i++){
                    let r = results[i];
                    let d = new Disc(r.name, r.year);
                    d.Id = r.id;

                    discs.push(d);
                }

                resolve(discs);
            });

            conn.end();
        });
        
        return p;
    }

    getAll() : Promise<Disc[]>{
        let p = new Promise<Disc[]>(async (resolve, reject) =>{
            let conn = await this.getConn();

            conn.query("SELECT id, name, year FROM Disc", 
            (error, results, fields) =>{
                if(error) {
                    reject(error);
                    return;
                }

                let discs : Disc[] = [];

                for(let i = 0; i < results.length; i++){
                    let r = results[i];
                    let d = new Disc(r.name, r.year);
                    d.Id = r.id;

                    discs.push(d);
                }

                resolve(discs);
            });

            conn.end();
        });
        
        return p;
    }

    findByName(filter : String) : Promise<Disc[]>{
        let p = new Promise<Disc[]>(async (resolve, reject) =>{
            let conn = await this.getConn();

            conn.query("SELECT id, name, year, disc_collection_id FROM Disc WHERE name LIKE '%?%'", [filter], 
            (error, results, fields) =>{
                if(error) {
                    reject(error);
                    return;
                }

                let discs : Disc[] = [];

                for(let i = 0; i < results.length; i++){
                    let r = results[i];
                    let d = new Disc(r.name, r.year);
                    d.Id = r.id;

                    discs.push(d);
                }

                resolve(discs);
            });

            conn.end();
        });
        
        return p;
    }
}