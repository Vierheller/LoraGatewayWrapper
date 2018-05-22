import {FSWatcher, watch} from "chokidar";
import * as fs from "fs";
import {Stats} from "fs";
import * as Path from "path";
import {Logging} from "../util/Logging";
import {Base64Encoder} from "./Base64Encoder";
import ErrnoException = NodeJS.ErrnoException;
import {ImageFile} from "./ImageFile";
import {ImageHelper} from "./ImageHelper";
import {ImageAdapter} from "./ImageAdpater";

export class ImageDirectoryWatcher {
    private static Log: Logging = Logging.getInstance("ImageDirectoryWatcher");

    private static getFile(path: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void) {
        fs.readFile(path, callback);
    }

    private directoryPath: string;
    private watcher: FSWatcher;

    private downloadHelper: ImageHelper;

    private onFileDownloadFinishedListener: (image: ImageAdapter) => void;

    constructor(path: string) {
        this.directoryPath = path;
        this.init();
    }

    public finishedDownload(image: ImageFile) {
        const base64Image = Base64Encoder.encode(image.path);
        const image2 = new ImageAdapter(image.count, image.fileName, base64Image, image.appearDate);
        this.onFileDownloadFinishedListener(image2);
    }

    public setDownloadFinishedListener(
        listener: (image: ImageAdapter) => void) {
        this.onFileDownloadFinishedListener = listener;
    }

    private init() {
        this.watcher = watch(this.directoryPath, {
            persistent: true,
        });

        this.downloadHelper = new ImageHelper(this);

        this.watcher
            .on("add", (path: string) => {
                ImageDirectoryWatcher.Log.log("File", path, " added");
                this.processFile(path);
            })
            .on("change", (path: string) => {
                // ImageDirectoryWatcher.Log.log("File", path, "has been changed");
            })
            .on("unlink", (path: string) => {
                // ImageDirectoryWatcher.Log.log("File", path, "has been removed");
            })
            .on("error", (error) => {
                ImageDirectoryWatcher.Log.error("Error happened", error);
            });

    }

    private processFile(path: string) {
        const filename = this.getFileNameFromPath(path);
        // Valid filename?
        const regex = new RegExp(/[a-zA-Z]+_\d+/);
        if (regex.test(filename)) {
            // Cut off .JPG
            let counterstr = filename.split(".")[0];
            // Cut off DHBW_
            counterstr = counterstr.split("_").pop();
            // Try to get iNode stats for the picture
            fs.stat(path, (err: ErrnoException, stats: Stats) => {
                let photo: ImageFile;
                if (err !== null) {
                    // Can happen if the OS does not provide INode stats for Files
                    ImageDirectoryWatcher.Log.error(err);
                    photo = new ImageFile(path, filename, Number(counterstr), new Date());
                } else {
                    // No error, we can get the photo stats
                    photo = new ImageFile(path, filename, Number(counterstr), stats.birthtime);
                }
                ImageDirectoryWatcher.Log.log(photo.toString());
                this.downloadHelper.putPhoto(photo);
            });
        } else {
            ImageDirectoryWatcher.Log.error(filename + " does not match pattern");
        }
    }

    /**
     * gets last part of path
     * @param {string} path
     * @returns {string | undefined}
     */
    private getFileNameFromPath(path: string) {
        return Path.basename(path);
    }

}
