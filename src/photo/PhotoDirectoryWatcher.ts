import {FSWatcher, watch} from "chokidar";
import * as fs from "fs";
import {Stats} from "fs";
import * as Path from "path";
import {Logging} from "../util/Logging";
import {Base64Encoder} from "./Base64Encoder";
import ErrnoException = NodeJS.ErrnoException;
import {Photo} from "./Photo";
import {PhotoHelper} from "./PhotoHelper";

export class PhotoDirectoryWatcher {
    private static Log: Logging = Logging.getInstance("PhotoDirectoryWatcher");

    private static getFile(path: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void) {
        fs.readFile(path, callback);
    }

    private directoryPath: string;
    private watcher: FSWatcher;

    private downloadHelper: PhotoHelper;

    private onFileDownloadFinishedListener: (count: number, path: string,
                                             fileName: string, photoTimestamp: Date) => void;

    constructor(path: string) {
        this.directoryPath = path;
        this.init();
    }

    public finishedDownload(photo: Photo) {
        this.onFileDownloadFinishedListener(photo.count, photo.path, photo.fileName, photo.appearDate);
    }

    public setDownloadFinishedListener(
        listener: (count: number, path: string, fileName: string, photoTimestamp: Date) => void) {
        this.onFileDownloadFinishedListener = listener;
    }

    private init() {
        this.watcher = watch(this.directoryPath, {
            persistent: true,
        });

        this.downloadHelper = new PhotoHelper(this);

        this.watcher
            .on("add", (path: string) => {
                PhotoDirectoryWatcher.Log.log("File", path, " added");
                this.processFile(path);
            })
            .on("change", (path: string) => {
                // PhotoDirectoryWatcher.Log.log("File", path, "has been changed");
            })
            .on("unlink", (path: string) => {
                // PhotoDirectoryWatcher.Log.log("File", path, "has been removed");
            })
            .on("error", (error) => {
                PhotoDirectoryWatcher.Log.error("Error happened", error);
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
                let photo: Photo;
                if (err !== null) {
                    // Can happen if the OS does not provide INode stats for Files
                    PhotoDirectoryWatcher.Log.error(err);
                    photo = new Photo(path, filename, Number(counterstr), new Date());
                } else {
                    // No error, we can get the photo stats
                    photo = new Photo(path, filename, Number(counterstr), stats.birthtime);
                }
                PhotoDirectoryWatcher.Log.log(photo.toString());
                this.downloadHelper.putPhoto(photo);
            });
        } else {
            PhotoDirectoryWatcher.Log.error(filename + " does not match pattern");
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
