"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OniService = void 0;
var common_1 = require("@nestjs/common");
var server_disk_1 = require("@onivoro/server-disk");
var path_1 = require("path");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var OniService = /** @class */ (function () {
    function OniService(oniJsonPath, packageJsonTemplate) {
        this.oniJsonPath = oniJsonPath;
        this.packageJsonTemplate = packageJsonTemplate;
    }
    OniService.prototype.getOrCreatePackageJson = function (path, name) {
        var _this = this;
        return server_disk_1.readObjectRx(path).pipe(operators_1.catchError(function () { return _this.createPackageJson(path, name); }));
    };
    OniService.prototype.readOniJson = function () {
        return server_disk_1.readObjectRx(path_1.resolve(process.cwd(), this.oniJsonPath.value));
    };
    OniService.prototype.readProject = function (name) {
        return this.readOniJson().pipe(operators_1.map(function (pjs) { return pjs.projects[name]; }));
    };
    OniService.prototype.readProjectVersionLegacy = function (name) {
        return this.readProject(name).pipe(operators_1.map(function (pj) { return pj.version; }));
    };
    OniService.prototype.readProjectVersion = function (distPackageJsonPath) {
        return server_disk_1.readObjectRx(distPackageJsonPath).pipe(operators_1.map(function (contents) { return contents.version; }), operators_1.catchError(function () { return rxjs_1.of(null); }));
    };
    OniService.prototype.writeOniJson = function (json) {
        return server_disk_1.writeObjectRx(path_1.resolve(process.cwd(), this.oniJsonPath.value), json);
    };
    OniService.prototype.writePackageJsonVersion = function (packageJsonPath, version) {
        return server_disk_1.readObjectRx(packageJsonPath).pipe(operators_1.concatMap(function (contents) {
            contents.version = version;
            return server_disk_1.writeObjectRx(packageJsonPath, contents);
        }));
    };
    OniService.prototype.createPackageJson = function (path, name) {
        var body = this.packageJsonTemplate.transform({ name: name });
        return server_disk_1.writeObjectRx(path, body).pipe(operators_1.map(function () { return body; }));
    };
    OniService.prototype.writeProjectVersion = function (projectName, versionToPublish) {
        var _this = this;
        return this.readOniJson().pipe(operators_1.concatMap(function (json) {
            json.projects[projectName].version = versionToPublish;
            return _this.writeOniJson(json);
        }));
    };
    OniService = __decorate([
        common_1.Injectable()
    ], OniService);
    return OniService;
}());
exports.OniService = OniService;
