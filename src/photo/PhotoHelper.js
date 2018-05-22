"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigHolder_1 = require("../config/ConfigHolder");
var Logging_1 = require("../util/Logging");
var PhotoHelper = /** @class */ (function () {
    function PhotoHelper(watcher) {
        var _this = this;
        this.images = [];
        this.watcherTimeInterval = ConfigHolder_1.ConfigHolder.config.photo_watcher_interval;
        this.imageShouldBeFinishedTime = ConfigHolder_1.ConfigHolder.config.max_photo_download_time;
        this.currentCount = 0;
        this.watcher = watcher;
        this.timeWatcher = setInterval(function () {
            _this.finishPhotosIfExist();
        }, this.watcherTimeInterval);
    }
    PhotoHelper.prototype.putPhoto = function (image) {
        this.currentCount = image.count;
        this.finishPhotosIfExist();
        this.images.push(image);
    };
    PhotoHelper.prototype.finishPhotosIfExist = function () {
        var _this = this;
        this.images.forEach((function (value, index) {
            if (value.count < _this.currentCount || value.appearDate.getTime()
                < new Date().getTime() - _this.imageShouldBeFinishedTime) {
                _this.watcher.finishedDownload(value);
                PhotoHelper.Log.log("Finished foto: " + value);
                _this.images[index] = null;
            }
        }));
        this.images = this.images.filter((function (value) {
            return value != null;
        }));
    };
    PhotoHelper.Log = Logging_1.Logging.getInstance("PhotoHelper");
    return PhotoHelper;
}());
exports.PhotoHelper = PhotoHelper;
//# sourceMappingURL=PhotoHelper.js.map