import { Disc } from "./Disc";
import { ArgumentNullException } from "./ArgumentNullException";

export class DiscCollection{
    Id: number;
    Name: String;
    Discs: Disc[];

    constructor(name: String){
        if(!name || name == "")
            throw new ArgumentNullException("Parameter 'name' is empty.");

        this.Name = name;
        this.Discs = [];
        this.Id = 0;
    }
}