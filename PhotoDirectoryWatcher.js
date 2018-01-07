"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chokidar_1 = require("chokidar");
var PhotoDirectoryWatcher = /** @class */ (function () {
    function PhotoDirectoryWatcher(path) {
        this.directoryPath = path;
        this.init();
    }
    PhotoDirectoryWatcher.prototype.init = function () {
        this.watcher = chokidar_1.watch(this.directoryPath, {
            persistent: true
        });
        var that = this;
        this.watcher
            .on('add', function (path) {
            console.log('File', path, 'has been added');
            if (this.isDownloadFinished(path)) {
                if (this.onFileDownloadFinishedListener)
                    this.onFileDownloadFinishedListener();
                console.log(path, " finished download");
            }
        })
            .on('change', function (path) {
            console.log('File', path, 'has been changed');
        })
            .on('unlink', function (path) {
            console.log('File', path, 'has been removed');
        })
            .on('error', function (error) {
            console.error('Error happened', error);
        });
    };
    PhotoDirectoryWatcher.prototype.isDownloadFinished = function (path) {
        return true;
    };
    PhotoDirectoryWatcher.prototype.setDownloadFinishedListener = function (listener) {
        this.onFileDownloadFinishedListener = listener;
    };
    return PhotoDirectoryWatcher;
}());
exports.PhotoDirectoryWatcher = PhotoDirectoryWatcher;
