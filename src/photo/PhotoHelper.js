"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigHolder_1 = require("../config/ConfigHolder");
var Logging_1 = require("../util/Logging");
var PhotoHelper = /** @class */ (function () {
    function PhotoHelper(watcher) {
        var _this = this;
        this.photos = [];
        this.watcherTimeInterval = ConfigHolder_1.ConfigHolder.config.photo_watcher_interval;
        this.photoShouldBeFinishedTime = ConfigHolder_1.ConfigHolder.config.max_photo_download_time;
        this.currentCount = 0;
        this.watcher = watcher;
        this.timeWatcher = setInterval(function () {
            _this.finishPhotosIfExist();
        }, this.watcherTimeInterval);
    }
    PhotoHelper.prototype.putPhoto = function (photo) {
        this.currentCount = photo.count;
        this.finishPhotosIfExist();
        this.photos.push(photo);
    };
    PhotoHelper.prototype.finishPhotosIfExist = function () {
        var _this = this;
        this.photos.forEach((function (value, index) {
            if (value.count < _this.currentCount || value.appearDate.getTime()
                < new Date().getTime() - _this.photoShouldBeFinishedTime) {
                _this.watcher.finishedDownload(value);
                PhotoHelper.Log.log("Finished foto: " + value);
                _this.photos[index] = null;
            }
        }));
        this.photos = this.photos.filter((function (value) {
            return value != null;
        }));
    };
    PhotoHelper.Log = Logging_1.Logging.getInstance(PhotoHelper.toString());
    return PhotoHelper;
}());
exports.PhotoHelper = PhotoHelper;
//# sourceMappingURL=PhotoHelper.js.map