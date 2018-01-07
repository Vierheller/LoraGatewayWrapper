import {FSWatcher, watch} from "chokidar";

export class PhotoDirectoryWatcher{
    directoryPath:string;
    watcher:FSWatcher;

    onFileDownloadFinishedListener:(path:string)=>void

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
                if(this.isDownloadFinished(path)){
                    if(this.onFileDownloadFinishedListener)
                        this.onFileDownloadFinishedListener()

                    console.log(path, " finished download")
                }
            })
            .on('change', function(path) {
                console.log('File', path, 'has been changed');
            })
            .on('unlink', function(path) {
                console.log('File', path, 'has been removed');
            })
            .on('error', function(error) {
                console.error('Error happened', error);
            })

    }

    private isDownloadFinished(path):boolean{
        return true
    }

    setDownloadFinishedListener(listener:(path:string)=>void){
        this.onFileDownloadFinishedListener = listener
    }

}