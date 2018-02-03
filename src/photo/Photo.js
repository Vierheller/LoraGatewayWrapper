"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Photo = /** @class */ (function () {
    function Photo(path, fileName, count, appearDate) {
        this.path = path;
        this.fileName = fileName;
        this.count = count;
        this.appearDate = appearDate;
    }
    Photo.prototype.toString = function () {
        return "path: " + this.path + " fileName: " + this.fileName + " count: "
            + this.count + " appeared:" + this.appearDate;
    };
    return Photo;
}());
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map