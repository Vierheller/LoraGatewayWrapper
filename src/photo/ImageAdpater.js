"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageAdapter = /** @class */ (function () {
    function ImageAdapter(fileName, base64Image) {
        this.id = ImageAdapter.ID_COUNTER++;
        this.fileName = fileName;
        this.base64Image = base64Image;
        this.timestamp = new Date();
    }
    ImageAdapter.prototype.getJSON = function () {
        return this.toJSON();
    };
    ImageAdapter.prototype.toJSON = function () {
        var json = {};
        json.image_counter = this.id;
        json.filename = this.fileName;
        json.image_base64 = this.base64Image;
        json.type = "image";
        return json;
    };
    // TODO from image
    ImageAdapter.ID_COUNTER = 0;
    return ImageAdapter;
}());
exports.ImageAdapter = ImageAdapter;
//# sourceMappingURL=ImageAdpater.js.map