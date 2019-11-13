import { ObjectNotFoundException } from "../repositories/ObjectNotFoundException";
import { ArgumentNullException } from "../domain/ArgumentNullException";

export class BaseController{
    protected async execute(req : any, res : any, callback : any){
        try{
            await callback();
        }
        catch(ex){
            console.log("Exceção: ");
            console.log(ex);
            if(ex instanceof ObjectNotFoundException)
                res.status(404).send({
                    statusCode : 404,
                    message : "Not found!"
                });
            else if(ex instanceof ArgumentNullException)
                res.status(400).send({
                    statusCode : 400,
                    message : ex._message
                });
            else
                res.status(500).send({
                    statusCode : 500,
                    message : "Internal server error."
                });
        }
    }
}