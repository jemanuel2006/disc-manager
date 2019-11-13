export class ArgumentNullException extends Error{
    _message : String;
    
    constructor(message : String){
        super(message.toString())
        this._message = message;
    }
}