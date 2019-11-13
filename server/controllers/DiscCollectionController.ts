import { BaseController } from "./BaseController";
import { DiscCollectionService } from "../services/DiscColletionService";

export class DiscCollectionController extends BaseController{
    private DiscCollectionService : DiscCollectionService;
    
    constructor(discCollectionService : DiscCollectionService){
        super();
        this.DiscCollectionService = discCollectionService;
    }

    async add(req : any, res : any){
        await this.execute(req, res, async () => {
            let collection = await this.DiscCollectionService.add(req.body.name, req.body.discIds);
            res.send(collection);
        });
    }

    async getAll(req : any, res : any){
        await this.execute(req, res, async () => {
            let discs = await this.DiscCollectionService.getAll();
            res.send(discs);
        });
    }

    async getById(req : any, res : any){
        await this.execute(req, res, async () => {
            let collection = await this.DiscCollectionService.getById(req.params.id);
            res.send(collection);
        });
    }

    async update(req : any, res : any){
        await this.execute(req, res, async () => {
            let collection = await this.DiscCollectionService.update(req.params.id, req.body.name, req.body.discIds);
            res.send(collection);
        });
    }
}