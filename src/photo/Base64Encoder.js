"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Base64Encoder = /** @class */ (function () {
    function Base64Encoder() {
    }
    Base64Encoder.encode = function (path) {
        // read binary data
        var bitmap = fs.readFileSync(path);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString('base64');
    };
    return Base64Encoder;
}());
exports.Base64Encoder = Base64Encoder;
//# sourceMappingURL=Base64Encoder.js.map