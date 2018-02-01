import {FSWatcher, watch} from "chokidar";
import * as fs from "fs";
import * as Path from "path";
import Timer = NodeJS.Timer;

export class PhotoDirectoryWatcher{
    private directoryPath:string;
    private watcher:FSWatcher;

    private downloadHelper:PhotoHelper;

    private onFileDownloadFinishedListener:(path:string, fileName:string, photoTimestamp:Date)=>void

    constructor(path:string){
        this.directoryPath = path;
        this.init()
    }

    private init(){
        this.watcher = watch(this.directoryPath, {
            persistent: true
        });

        this.downloadHelper = new PhotoHelper(this);

        this.watcher
            .on('add', (path:string)=> {
                console.log('File', path, 'has been added');
                this.processFile(path);
            })
            .on('change', (path:string)=> {
                console.log('File', path, 'has been changed');
            })
            .on('unlink', (path:string)=> {
                console.log('File', path, 'has been removed');
            })
            .on('error', (error)=> {
                console.error('Error happened', error);
            })

    }

    private static getFile(path:string, callback:(err:NodeJS.ErrnoException, data:Buffer)=>void){
        fs.readFile(path, callback)
    }

    private processFile(path:string){
        let filename = this.getFileNameFromPath(path);
        //Valid filename?
        if(/[a-zA-Z]+_[0-9]+/.test(filename)){
            //Cut off .JPG
            let counterstr = filename.split(".")[0];
            //Cut off DHBW_
            counterstr = counterstr.split("_").pop();

            let photo = new Photo(path, filename, Number(counterstr), new Date());
            console.log(photo.toString());
            this.downloadHelper.putPhoto(photo);
        }else{
            console.error(filename+" does not match pattern");
        }
    }

    /**
     * gets last part of path
     * @param {string} path
     * @returns {string | undefined}
     */
    private getFileNameFromPath(path:string){
        return Path.basename(path);
    }

    finishedDownload(photo:Photo){
        this.onFileDownloadFinishedListener(photo.path, photo.fileName, photo.appearDate)
    }


    public setDownloadFinishedListener(listener:(path:string, fileName:string, photoTimestamp:Date)=>void){
        this.onFileDownloadFinishedListener = listener
    }

}

class PhotoHelper{
    private photos = [];
    private watcher:PhotoDirectoryWatcher;

    private timeWatcher : Timer;
    private watcherTimeMillis:number = 1000;
    private photoShouldBeFinishedTime:number = 60000

    private currentCount = 0;

    constructor(watcher:PhotoDirectoryWatcher){
        this.watcher = watcher;

        this.timeWatcher = setInterval(()=>{
            this.finishPhotosIfExist()
        }, this.watcherTimeMillis)
    }

    putPhoto(photo:Photo){
        this.currentCount = photo.count;
        this.finishPhotosIfExist();
        this.photos.push(photo);
    }

    private finishPhotosIfExist() {
        this.photos.forEach(((value:Photo, index:number) => {
            if(value.count < this.currentCount || value.appearDate.getTime() < new Date().getTime() - this.photoShouldBeFinishedTime){
                this.watcher.finishedDownload(value);
                this.photos[index] = null;
            }
        }));
        console.log(this.photos);
        this.photos = this.photos.filter(((value:Photo) => {
            return value!=null;
        }));
        console.log(this.photos);
    }
}

class Photo{
    path:string;
    fileName:string;
    count:number;
    appearDate:Date;

    constructor(path:string, fileName:string, count:number, appearDate:Date){
        this.path = path;
        this.fileName = fileName;
        this.count = count;
        this.appearDate = appearDate;
    }

    toString():string{
        return "path: "+ this.path + " fileName: "+this.fileName + " count: "+this.count + " appeared:"+this.appearDate;
    }
}