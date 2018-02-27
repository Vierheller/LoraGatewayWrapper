"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chokidar_1 = require("chokidar");
var fs = require("fs");
var Path = require("path");
var Logging_1 = require("../util/Logging");
var Photo_1 = require("./Photo");
var PhotoHelper_1 = require("./PhotoHelper");
var PhotoDirectoryWatcher = /** @class */ (function () {
    function PhotoDirectoryWatcher(path) {
        this.directoryPath = path;
        this.init();
    }
    PhotoDirectoryWatcher.getFile = function (path, callback) {
        fs.readFile(path, callback);
    };
    PhotoDirectoryWatcher.prototype.finishedDownload = function (photo) {
        this.onFileDownloadFinishedListener(photo.count, photo.path, photo.fileName, photo.appearDate);
    };
    PhotoDirectoryWatcher.prototype.setDownloadFinishedListener = function (listener) {
        this.onFileDownloadFinishedListener = listener;
    };
    PhotoDirectoryWatcher.prototype.init = function () {
        var _this = this;
        this.watcher = chokidar_1.watch(this.directoryPath, {
            persistent: true,
        });
        this.downloadHelper = new PhotoHelper_1.PhotoHelper(this);
        this.watcher
            .on("add", function (path) {
            PhotoDirectoryWatcher.Log.log("File", path, " added");
            _this.processFile(path);
        })
            .on("change", function (path) {
            // PhotoDirectoryWatcher.Log.log("File", path, "has been changed");
        })
            .on("unlink", function (path) {
            // PhotoDirectoryWatcher.Log.log("File", path, "has been removed");
        })
            .on("error", function (error) {
            PhotoDirectoryWatcher.Log.error("Error happened", error);
        });
    };
    PhotoDirectoryWatcher.prototype.processFile = function (path) {
        var _this = this;
        var filename = this.getFileNameFromPath(path);
        // Valid filename?
        var regex = new RegExp(/[a-zA-Z]+_\d+/);
        if (regex.test(filename)) {
            // Cut off .JPG
            var counterstr_1 = filename.split(".")[0];
            // Cut off DHBW_
            counterstr_1 = counterstr_1.split("_").pop();
            // Try to get iNode stats for the picture
            fs.stat(path, function (err, stats) {
                var photo;
                if (err !== null) {
                    // Can happen if the OS does not provide INode stats for Files
                    PhotoDirectoryWatcher.Log.error(err);
                    photo = new Photo_1.Photo(path, filename, Number(counterstr_1), new Date());
                }
                else {
                    // No error, we can get the photo stats
                    photo = new Photo_1.Photo(path, filename, Number(counterstr_1), stats.birthtime);
                }
                PhotoDirectoryWatcher.Log.log(photo.toString());
                _this.downloadHelper.putPhoto(photo);
            });
        }
        else {
            PhotoDirectoryWatcher.Log.error(filename + " does not match pattern");
        }
    };
    /**
     * gets last part of path
     * @param {string} path
     * @returns {string | undefined}
     */
    PhotoDirectoryWatcher.prototype.getFileNameFromPath = function (path) {
        return Path.basename(path);
    };
    PhotoDirectoryWatcher.Log = Logging_1.Logging.getInstance("PhotoDirectoryWatcher");
    return PhotoDirectoryWatcher;
}());
exports.PhotoDirectoryWatcher = PhotoDirectoryWatcher;
//# sourceMappingURL=PhotoDirectoryWatcher.js.map