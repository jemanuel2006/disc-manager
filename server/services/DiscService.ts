import { Disc } from "../domain/Disc";
import { DiscRepository } from "../repositories/DiscRepository";
import { ArgumentNullException } from "../domain/ArgumentNullException";

export class DiscService{
    private DiscRepository : DiscRepository;
    
    constructor(discRepository : DiscRepository){
        this.DiscRepository = discRepository;
    }

    async add(name: String, year: number) : Promise<Disc>{
        let disc = new Disc(name, year);

        this.DiscRepository.add(disc);

        return disc;
    }

    async getAll() : Promise<Disc[]>{
        let discs = this.DiscRepository.getAll();

        return discs;
    }

    async getById(id : number){
        return await this.DiscRepository.getById(id);
    }

    async update(id: number, name:String, year: number){
        let disc = await this.DiscRepository.getById(id);

        let updatedDisc = new Disc(name, year);
        updatedDisc.Id = disc.Id;

        this.DiscRepository.update(updatedDisc);
    }
}