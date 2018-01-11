export class LogHandler{

    private LogHandler(){

    }

    public static getInstance(){
        return new LogHandler()
    }

    public error(message?: any, ...optionalParams: any[]){
        console.error(message, optionalParams)
    }

    public log(message?: any, ...optionalParams: any[]){
        console.log(message, optionalParams)
    }
}