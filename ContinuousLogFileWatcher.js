"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tail = require("nodejs-tail");
var ContinuousLogFileWatcher = /** @class */ (function () {
    function ContinuousLogFileWatcher(file) {
        this.path = file;
    }
    ContinuousLogFileWatcher.prototype.watch = function () {
        var _this = this;
        this.tailWatcher = new Tail(this.path);
        this.tailWatcher.on('line', function (line) {
            if (_this.listener)
                _this.listener(line);
        });
        this.tailWatcher.on('close', function () {
            console.log('watching stopped');
        });
        this.tailWatcher.watch();
    };
    ContinuousLogFileWatcher.prototype.stopWatching = function () {
        this.tailWatcher.close();
    };
    ContinuousLogFileWatcher.prototype.setOnNewLineListener = function (listener) {
        this.listener = listener;
    };
    return ContinuousLogFileWatcher;
}());
exports.ContinuousLogFileWatcher = ContinuousLogFileWatcher;
