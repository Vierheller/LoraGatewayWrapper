import {FSWatcher, watch} from "chokidar";

export class PhotoDirectoryWatcher{
    directoryPath:string;

    watcher:FSWatcher;

    onFileAddedListener:(path:string)=>void;
    onFileChangedListener:(path:string)=>void;
    onFileRemovedListener:(path:string)=>void;

    constructor(path:string){
        this.directoryPath = path
        this.init()
    }

    private init(){
        this.watcher = watch(this.directoryPath, {
            persistent: true
        });
        const that = this;
        this.watcher
            .on('add', function(path) {
                console.log('File', path, 'has been added');
                if(that.onFileAddedListener)
                    that.onFileAddedListener(path)
            })
            .on('change', function(path) {
                console.log('File', path, 'has been changed');
                if(that.onFileChangedListener)
                    that.onFileChangedListener(path)
            })
            .on('unlink', function(path) {
                console.log('File', path, 'has been removed');
                if(that.onFileRemovedListener)
                    that.onFileRemovedListener(path)
            })
            .on('error', function(error) {
                console.error('Error happened', error);
            })

    }

    public setOnFileAddedListener(listener : (path:string)=>void){
        this.onFileAddedListener = listener
    }

    public setOnFileChangedListener(listener : (path:string)=>void){
        this.onFileChangedListener = listener
    }

    public setOnFileRemovedListener(listener : (path:string)=>void){
        this.onFileRemovedListener = listener
    }
}