"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chokidar_1 = require("chokidar");
var fs = require("fs");
var Path = require("path");
var PhotoDirectoryWatcher = /** @class */ (function () {
    function PhotoDirectoryWatcher(path) {
        this.directoryPath = path;
        this.init();
    }
    PhotoDirectoryWatcher.prototype.init = function () {
        var _this = this;
        this.watcher = chokidar_1.watch(this.directoryPath, {
            persistent: true
        });
        this.downloadHelper = new PhotoHelper(this);
        this.watcher
            .on('add', function (path) {
            console.log('File', path, 'has been added');
            _this.processFile(path);
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
    PhotoDirectoryWatcher.getFile = function (path, callback) {
        fs.readFile(path, callback);
    };
    PhotoDirectoryWatcher.prototype.processFile = function (path) {
        var filename = this.getFileNameFromPath(path);
        //Valid filename?
        if (/[a-zA-Z]+_[0-9]+/.test(filename)) {
            //Cut off .JPG
            var counterstr = filename.split(".")[0];
            //Cut off DHBW_
            counterstr = counterstr.split("_").pop();
            var photo = new Photo(path, filename, Number(counterstr), new Date());
            console.log(photo.toString());
            this.downloadHelper.putPhoto(photo);
        }
        else {
            console.error(filename + " does not match pattern");
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
    PhotoDirectoryWatcher.prototype.finishedDownload = function (photo) {
        this.onFileDownloadFinishedListener(photo.path, photo.fileName, photo.appearDate);
    };
    PhotoDirectoryWatcher.prototype.setDownloadFinishedListener = function (listener) {
        this.onFileDownloadFinishedListener = listener;
    };
    return PhotoDirectoryWatcher;
}());
exports.PhotoDirectoryWatcher = PhotoDirectoryWatcher;
var PhotoHelper = /** @class */ (function () {
    function PhotoHelper(watcher) {
        var _this = this;
        this.photos = [];
        this.watcherTimeMillis = 1000;
        this.photoShouldBeFinishedTime = 60000;
        this.currentCount = 0;
        this.watcher = watcher;
        this.timeWatcher = setInterval(function () {
            _this.finishPhotosIfExist();
        }, this.watcherTimeMillis);
    }
    PhotoHelper.prototype.putPhoto = function (photo) {
        this.currentCount = photo.count;
        this.finishPhotosIfExist();
        this.photos.push(photo);
    };
    PhotoHelper.prototype.finishPhotosIfExist = function () {
        var _this = this;
        this.photos.forEach((function (value, index) {
            if (value.count < _this.currentCount || value.appearDate.getTime() < new Date().getTime() - _this.photoShouldBeFinishedTime) {
                _this.watcher.finishedDownload(value);
                _this.photos[index] = null;
            }
        }));
        console.log(this.photos);
        this.photos = this.photos.filter((function (value) {
            return value != null;
        }));
        console.log(this.photos);
    };
    return PhotoHelper;
}());
var Photo = /** @class */ (function () {
    function Photo(path, fileName, count, appearDate) {
        this.path = path;
        this.fileName = fileName;
        this.count = count;
        this.appearDate = appearDate;
    }
    Photo.prototype.toString = function () {
        return "path: " + this.path + " fileName: " + this.fileName + " count: " + this.count + " appeared:" + this.appearDate;
    };
    return Photo;
}());
//# sourceMappingURL=PhotoDirectoryWatcher.js.map