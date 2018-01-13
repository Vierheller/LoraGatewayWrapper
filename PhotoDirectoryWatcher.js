"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chokidar_1 = require("chokidar");
var fs = require("fs");
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
        var _this = this;
        PhotoDirectoryWatcher.getFile(path, function (err, data) {
            var metadata = _this.getMetadata(path);
            if (_this.isDownloadFinished(path)) {
                if (_this.onFileDownloadFinishedListener)
                    //TODO update arguments
                    _this.onFileDownloadFinishedListener(path, path, new Date());
                console.log(path, " finished download");
            }
        });
    };
    PhotoDirectoryWatcher.prototype.isDownloadFinished = function (data) {
        return true;
    };
    //TODO find proper lib maybe: https://github.com/rsms/node-imagemagick
    PhotoDirectoryWatcher.prototype.getMetadata = function (path) {
        return {
            data: 123
        };
    };
    PhotoDirectoryWatcher.prototype.setDownloadFinishedListener = function (listener) {
        this.onFileDownloadFinishedListener = listener;
    };
    return PhotoDirectoryWatcher;
}());
exports.PhotoDirectoryWatcher = PhotoDirectoryWatcher;
