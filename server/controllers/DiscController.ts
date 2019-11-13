import { DiscService } from "../services/DiscService";
import { BaseController } from "./BaseController";

export class DiscController extends BaseController{
    private DiscService : DiscService;
    
    constructor(discService : DiscService){
        super();
        this.DiscService = discService;
    }

    async add(req : any, res : any){
        await this.execute(req, res, async () => {
            let disc = await this.DiscService.add(req.body.name, req.body.year);
            res.send(disc);
        });
    }

    async getAll(req : any, res : any){
        await this.execute(req, res, async () => {
            let discs = await this.DiscService.getAll();
            res.send(discs);
        });
    }

    async update(req : any, res : any){
        await this.execute(req, res, async () => {
            await this.DiscService.update(req.params.id, req.body.name, req.body.year);
            res.send();
        });
    }
    
    async getById(req : any, res : any){
        await this.execute(req, res, async () => {
            let disc = await this.DiscService.getById(req.params.id);
            res.send(disc);
        });
    }
}