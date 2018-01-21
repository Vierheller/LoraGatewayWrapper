"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageAdapter = /** @class */ (function () {
    function ImageAdapter(fileName, base64Image) {
        this.id = ImageAdapter.id_counter++;
        this.fileName = fileName;
        this.base64Image = base64Image;
        this.timestamp = new Date();
    }
    ImageAdapter.prototype.toJSON = function () {
        var json = {};
        json.image_counter = this.id;
        json.filename = this.fileName;
        json.image_base64 = this.base64Image;
        json.type = "image";
        return json;
    };
    ImageAdapter.prototype.getJSON = function () {
        return this.toJSON();
    };
    //TODO from image
    ImageAdapter.id_counter = 0;
    return ImageAdapter;
}());
exports.ImageAdapter = ImageAdapter;
//# sourceMappingURL=ImageAdpater.js.map