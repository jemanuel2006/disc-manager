import { BaseRepository } from "./BaseRepository";
import { DiscCollection } from "../domain/DiscCollection";
import { ObjectNotFoundException } from "./ObjectNotFoundException";

export class DiscCollectionRepository extends BaseRepository{
    add(discCollection : DiscCollection) : Promise<DiscCollection>{
        let p = new Promise<DiscCollection>(async (resolve, reject) =>{
            let conn = await this.getConn();

            conn.beginTransaction((err) =>{
                conn.query("INSERT INTO DiscCollection (name) VALUES (?)", [discCollection.Name], 
                (error, results, fields) =>{
                if(error) {
                    conn.rollback(() =>{
                        reject(error);
                    })
                    return;
                }

                discCollection.Id = results.insertId;

                let discsIds = discCollection.Discs.map(m => [m.Id, discCollection.Id]);

                conn.query("INSERT INTO Disc_DiscCollection (disc_id, disc_collection_id) VALUES ?", [discsIds], 
                (e, results, fields) =>{
                    if(e) {
                        conn.rollback(() =>{
                            reject(e);
                        })
                        return;
                    }

                    conn.commit((er) =>{
                        if(er) {
                            conn.rollback(() =>{
                                reject(er);
                            })
                            return;
                        }

                        resolve(discCollection);
                    })
                });
            });
            })
        });

        return p
    }

    getAll() : Promise<DiscCollection[]>{
        let p = new Promise<DiscCollection[]>(async (resolve, reject) =>{
            let conn = await this.getConn();

            conn.query("SELECT id, name FROM DiscCollection", 
            (error, results, fields) =>{
                if(error) {
                    reject(error);
                    return;
                }

                let discs : DiscCollection[] = [];

                for(let i = 0; i < results.length; i++){
                    let r = results[i];
                    let d = new DiscCollection(r.name);
                    d.Id = r.id;

                    discs.push(d);
                }

                resolve(discs);
            });
        });

        return p;
    }

    getById(id : number) : Promise<DiscCollection>{
        let p = new Promise<DiscCollection>(async (resolve, reject) =>{
            let conn = await this.getConn();

            conn.query("SELECT id, name FROM DiscCollection WHERE id = ?", [id],
            (error, results, fields) =>{
                if(error) {
                    reject(error);
                    return;
                }

                if(results.length < 1)
                    reject(new ObjectNotFoundException(`A coleção de id ${id} não existe no banco de dados.`));

                let r = results[0];
                let d = new DiscCollection(r.name);
                d.Id = r.id;

                resolve(d);
            });
        });

        return p;
    }

    update(collection : DiscCollection) : Promise<DiscCollection>{
        let p = new Promise<DiscCollection>(async (resolve, reject) =>{
            let conn = await this.getConn();

            conn.beginTransaction((err) =>{
                conn.query("UPDATE DiscCollection SET name = ? WHERE id = ?", [collection.Name, collection.Id], 
                (er1, results, fields) =>{
                if(er1) {
                    conn.rollback(() =>{
                        reject(er1);
                    })
                    return;
                }

                let discsIds = collection.Discs.map(m => [m.Id, collection.Id]);

                conn.query("DELETE FROM Disc_DiscCollection WHERE disc_collection_id = ?", [collection.Id], 
                (er2, results, fields) =>{
                    if(er2) {
                        conn.rollback(() =>{
                            reject(er2);
                        })
                        return;
                    }

                    conn.query("INSERT INTO Disc_DiscCollection (disc_id, disc_collection_id) VALUES ?", [discsIds], 
                        (er3, results, fields) =>{
                            if(er3) {
                                conn.rollback(() =>{
                                    reject(er3);
                                })
                                return;
                            }

                            conn.commit((er4) =>{
                                if(er4) {
                                    conn.rollback(() =>{
                                        reject(er4);
                                    })
                                    return;
                                }

                                resolve(collection);
                            })
                        });
                    })
                });
            });
        });

        return p
    }
}