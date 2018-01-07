import * as Tail from "nodejs-tail"

export class ContinuousLogFileWatcher{
    path:string;

    tailWatcher;

    listener:(line:string)=>void;

    constructor(file:string){
        this.path = file;
    }

    public watch(){
        this.tailWatcher = new Tail(this.path)
        this.tailWatcher .on('line', (line) => {
            if(this.listener)
                this.listener(line)
        });

        this.tailWatcher .on('close', () => {
            console.log('watching stopped');
        });

        this.tailWatcher.watch();
    }

    public stopWatching(){
        this.tailWatcher.close()
    }

    public setOnNewLineListener(listener:(line:string)=>void){
        this.listener = listener
    }
}