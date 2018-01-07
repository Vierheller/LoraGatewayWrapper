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
            if (that.onFileAddedListener)
                that.onFileAddedListener(path);
        })
            .on('change', function (path) {
            console.log('File', path, 'has been changed');
            if (that.onFileChangedListener)
                that.onFileChangedListener(path);
        })
            .on('unlink', function (path) {
            console.log('File', path, 'has been removed');
            if (that.onFileRemovedListener)
                that.onFileRemovedListener(path);
        })
            .on('error', function (error) {
            console.error('Error happened', error);
        });
    };
    PhotoDirectoryWatcher.prototype.setOnFileAddedListener = function (listener) {
        this.onFileAddedListener = listener;
    };
    PhotoDirectoryWatcher.prototype.setOnFileChangedListener = function (listener) {
        this.onFileChangedListener = listener;
    };
    PhotoDirectoryWatcher.prototype.setOnFileRemovedListener = function (listener) {
        this.onFileRemovedListener = listener;
    };
    return PhotoDirectoryWatcher;
}());
exports.PhotoDirectoryWatcher = PhotoDirectoryWatcher;
