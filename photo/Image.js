"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Image = /** @class */ (function () {
    function Image(fileName, base64Image) {
        this.id = Image.id_counter++;
        this.fileName = fileName;
        this.base64Image = base64Image;
        this.timestamp = new Date();
    }
    Image.prototype.toJSON = function () {
        var json = JSON.parse("{}");
        json["id"] = this.id;
        json["fileName"] = this.fileName;
        json["base64Image"] = this.base64Image;
        json["timestamp"] = this.timestamp;
        return json;
    };
    Image.id_counter = 0;
    return Image;
}());
exports.Image = Image;
