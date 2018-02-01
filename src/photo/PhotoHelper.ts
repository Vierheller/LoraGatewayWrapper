import {Photo} from "./Photo";
import {PhotoDirectoryWatcher} from "./PhotoDirectoryWatcher";
import Timer = NodeJS.Timer;

export class PhotoHelper {
    private photos = [];
    private watcher: PhotoDirectoryWatcher;

    private timeWatcher: Timer;
    private watcherTimeMillis: number = 1000;
    private photoShouldBeFinishedTime: number = 60000;

    private currentCount = 0;

    constructor(watcher: PhotoDirectoryWatcher) {
        this.watcher = watcher;

        this.timeWatcher = setInterval(() => {
            this.finishPhotosIfExist();
        }, this.watcherTimeMillis);
    }

    public putPhoto(photo: Photo) {
        this.currentCount = photo.count;
        this.finishPhotosIfExist();
        this.photos.push(photo);
    }

    private finishPhotosIfExist() {
        this.photos.forEach(((value: Photo, index: number) => {
            if (value.count < this.currentCount || value.appearDate.getTime()
                < new Date().getTime() - this.photoShouldBeFinishedTime) {
                this.watcher.finishedDownload(value);
                console.log("Finished foto: " + value);
                this.photos[index] = null;
            }
        }));
        this.photos = this.photos.filter(((value: Photo) => {
            return value != null;
        }));
    }
}
