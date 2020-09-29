"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NxService = void 0;
var common_1 = require("@nestjs/common");
var fs_1 = require("fs");
var path_1 = require("path");
var NxService = /** @class */ (function () {
    function NxService(nxJsonPath) {
        this.nxJsonPath = nxJsonPath;
    }
    NxService.prototype.getProjectKeys = function () {
        var where = path_1.resolve(process.cwd(), this.nxJsonPath.value);
        var nxJson = JSON.parse(fs_1.readFileSync(where, 'utf8'));
        return Object.keys(nxJson.projects).sort();
    };
    NxService = __decorate([
        common_1.Injectable()
    ], NxService);
    return NxService;
}());
exports.NxService = NxService;
