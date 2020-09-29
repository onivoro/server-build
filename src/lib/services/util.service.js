"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UtilService = void 0;
var common_1 = require("@nestjs/common");
var UtilService = /** @class */ (function () {
    function UtilService() {
    }
    UtilService.prototype.bumpVersion = function (currentVersion, segment) {
        if (segment === void 0) { segment = 'patch'; }
        var _a = currentVersion.split('.'), major = _a[0], minor = _a[1], patch = _a[2];
        var version = { major: major, minor: minor, patch: patch };
        version[segment] = "" + (Number(version[segment]) + 1);
        return [version.major, version.minor, version.patch].join('.');
    };
    UtilService = __decorate([
        common_1.Injectable()
    ], UtilService);
    return UtilService;
}());
exports.UtilService = UtilService;
