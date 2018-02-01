"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageAdapter = /** @class */ (function () {
    function ImageAdapter(id, fileName, base64Image, timestamp) {
        this.id = id;
        this.fileName = fileName;
        this.base64Image = base64Image;
        this.timestamp = timestamp;
    }
    ImageAdapter.prototype.getJSON = function () {
        return this.toJSON();
    };
    ImageAdapter.prototype.toJSON = function () {
        var json = {};
        json.image_counter = this.id;
        json.filename = this.fileName;
        json.image_base64 = this.base64Image;
        json.timestamp = this.timestamp.getTime();
        json.type = "image";
        return json;
    };
    return ImageAdapter;
}());
exports.ImageAdapter = ImageAdapter;
//# sourceMappingURL=ImageAdpater.js.map