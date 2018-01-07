import {FSWatcher, watch} from "chokidar";
import * as fs from "fs";

export class PhotoDirectoryWatcher{
    directoryPath:string;
    watcher:FSWatcher;

    onFileDownloadFinishedListener:(path:string, fileName:string, photoTimestamp:Date)=>void

    constructor(path:string){
        this.directoryPath = path
        this.init()
    }

    private init(){
        this.watcher = watch(this.directoryPath, {
            persistent: true
        });
        this.watcher
            .on('add', function(path) {
                console.log('File', path, 'has been added');
                this.processFile(path);
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

    private static getFile(path:string, callback:(err:NodeJS.ErrnoException, data:Buffer)=>void){
        fs.readFile(path, callback)
    }

    private processFile(path:string){
        PhotoDirectoryWatcher.getFile(path, function (err, data) {
            const metadata = this.getMetadata();
            if(this.isDownloadFinished(path)){
                if(this.onFileDownloadFinishedListener)
                    //TODO update arguments
                    this.onFileDownloadFinishedListener(path, path, new Date())

                console.log(path, " finished download")
            }
        });
    }

    private isDownloadFinished(data):boolean{
        return true
    }

    //TODO find proper lib maybe: https://github.com/rsms/node-imagemagick
    private getMetadata(data:Buffer):Object{
        return {
            data:123
        }
    }


    setDownloadFinishedListener(listener:(path:string, fileName:string, photoTimestamp:Date)=>void){
        this.onFileDownloadFinishedListener = listener
    }

}