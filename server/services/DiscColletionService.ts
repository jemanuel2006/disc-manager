import { DiscCollection } from "../domain/DiscCollection";
import { DiscCollectionRepository } from "../repositories/DiscCollectionRepository";
import { DiscRepository } from "../repositories/DiscRepository";

export class DiscCollectionService{
    DiscCollectionRepository : DiscCollectionRepository;
    DiscRepository : DiscRepository;

    constructor(discCollectionRepository : DiscCollectionRepository, discRepository : DiscRepository){
        this.DiscCollectionRepository = discCollectionRepository;
        this.DiscRepository = discRepository;
    }

    async add(name: String, discIds : number[]){
        let collection = new DiscCollection(name);
        collection.Discs = await this.DiscRepository.getByIds(discIds);

        await this.DiscCollectionRepository.add(collection);

        return collection;
    }

    async getAll() : Promise<DiscCollection[]>{
        return await this.DiscCollectionRepository.getAll();
    }

    async getById(id : number) : Promise<DiscCollection>{
        let col = await this.DiscCollectionRepository.getById(id);
        col.Discs = await this.DiscRepository.getByDiscCollection(id);

        return col;
    }

    async getByIdWithoutAssociation(id : number) : Promise<DiscCollection>{
        return await this.DiscCollectionRepository.getById(id);
    }

    async update(id: number, name: String, discIds : number[]){
        let collection = await this.getByIdWithoutAssociation(id);
        collection.Name = name;
        collection.Discs = await this.DiscRepository.getByIds(discIds);
        
        return await this.DiscCollectionRepository.update(collection);
    }
}