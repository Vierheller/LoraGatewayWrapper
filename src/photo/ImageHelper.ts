import {ConfigHolder} from "../config/ConfigHolder";
import {Logging} from "../util/Logging";
import {ImageFile} from "./ImageFile";
import {ImageDirectoryWatcher} from "./ImageDirectoryWatcher";
import Timer = NodeJS.Timer;

export class ImageHelper {
    private static Log: Logging = Logging.getInstance("ImageHelper");

    private images: ImageFile[] = [];
    private watcher: ImageDirectoryWatcher;

    private timeWatcher: Timer;
    private watcherTimeInterval: number = ConfigHolder.config.photo_watcher_interval;
    private imageShouldBeFinishedTime: number = ConfigHolder.config.max_photo_download_time;

    private currentCount = 0;

    constructor(watcher: ImageDirectoryWatcher) {
        this.watcher = watcher;

        this.timeWatcher = setInterval(() => {
            this.finishPhotosIfExist();
        }, this.watcherTimeInterval);
    }

    public putPhoto(image: ImageFile) {
        this.currentCount = image.count;
        this.finishPhotosIfExist();
        this.images.push(image);
    }

    private finishPhotosIfExist() {
        this.images.forEach(((value: ImageFile, index: number) => {
            if (value.count < this.currentCount || value.appearDate.getTime()
                < new Date().getTime() - this.imageShouldBeFinishedTime) {
                this.watcher.finishedDownload(value);
                ImageHelper.Log.log("Finished foto: " + value);
                this.images[index] = null;
            }
        }));
        this.images = this.images.filter(((value: ImageFile) => {
            return value != null;
        }));
    }
}
