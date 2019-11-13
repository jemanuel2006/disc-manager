import { ArgumentNullException } from "./ArgumentNullException";

export class Disc{
    Id: number;
    Name: String;
    Year: number;

    constructor(name: String, year: number){
        if(!name || name == "")
            throw new ArgumentNullException("Parameter 'name' is empty.");

        this.Name = name;
        this.Year = year;
        this.Id = 0;
    }
}