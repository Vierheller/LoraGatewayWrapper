"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Image = /** @class */ (function () {
    function Image(path, fileName, count, appearDate) {
        this.path = path;
        this.fileName = fileName;
        this.count = count;
        this.appearDate = appearDate;
    }
    Image.prototype.toString = function () {
        return "path: " + this.path + " fileName: " + this.fileName + " count: "
            + this.count + " appeared:" + this.appearDate;
    };
    return Image;
}());
exports.Image = Image;
//# sourceMappingURL=Image.js.map