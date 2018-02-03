import {ConfigHolder} from "../config/ConfigHolder";
import {Logging} from "../util/Logging";
import {ImageAdapter} from "./ImageAdpater";
import {Photo} from "./Photo";
import {PhotoDirectoryWatcher} from "./PhotoDirectoryWatcher";
import Timer = NodeJS.Timer;

export class PhotoHelper {
    private static Log: Logging = Logging.getInstance(PhotoHelper.toString());

    private photos = [];
    private watcher: PhotoDirectoryWatcher;

    private timeWatcher: Timer;
    private watcherTimeInterval: number = ConfigHolder.config.photo_watcher_interval;
    private photoShouldBeFinishedTime: number = ConfigHolder.config.max_photo_download_time;

    private currentCount = 0;

    constructor(watcher: PhotoDirectoryWatcher) {
        this.watcher = watcher;

        this.timeWatcher = setInterval(() => {
            this.finishPhotosIfExist();
        }, this.watcherTimeInterval);
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
                PhotoHelper.Log.log("Finished foto: " + value);
                this.photos[index] = null;
            }
        }));
        this.photos = this.photos.filter(((value: Photo) => {
            return value != null;
        }));
    }
}
