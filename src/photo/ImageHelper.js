"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigHolder_1 = require("../config/ConfigHolder");
var Logging_1 = require("../util/Logging");
var ImageHelper = /** @class */ (function () {
    function ImageHelper(watcher) {
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
    ImageHelper.prototype.putPhoto = function (image) {
        this.currentCount = image.count;
        this.finishPhotosIfExist();
        this.images.push(image);
    };
    ImageHelper.prototype.finishPhotosIfExist = function () {
        var _this = this;
        this.images.forEach((function (value, index) {
            if (value.count < _this.currentCount || value.appearDate.getTime()
                < new Date().getTime() - _this.imageShouldBeFinishedTime) {
                _this.watcher.finishedDownload(value);
                ImageHelper.Log.log("Finished foto: " + value);
                _this.images[index] = null;
            }
        }));
        this.images = this.images.filter((function (value) {
            return value != null;
        }));
    };
    ImageHelper.Log = Logging_1.Logging.getInstance("ImageHelper");
    return ImageHelper;
}());
exports.ImageHelper = ImageHelper;
//# sourceMappingURL=ImageHelper.js.map