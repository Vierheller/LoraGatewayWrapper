"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageFile = /** @class */ (function () {
    function ImageFile(path, fileName, count, appearDate) {
        this.path = path;
        this.fileName = fileName;
        this.count = count;
        this.appearDate = appearDate;
    }
    ImageFile.prototype.toString = function () {
        return "path: " + this.path + " fileName: " + this.fileName + " count: "
            + this.count + " appeared:" + this.appearDate;
    };
    return ImageFile;
}());
exports.ImageFile = ImageFile;
//# sourceMappingURL=ImageFile.js.map