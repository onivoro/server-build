"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AngularService = void 0;
var common_1 = require("@nestjs/common");
var server_disk_1 = require("@onivoro/server-disk");
var server_process_1 = require("@onivoro/server-process");
var path_1 = require("path");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
// import { ArchitectBuildTemplatePipe } from '../templates/architect-build-template.pipe';
var AngularService = /** @class */ (function () {
    function AngularService(angularJsonPath) {
        this.angularJsonPath = angularJsonPath;
    }
    AngularService.prototype.getAngularJson = function () {
        return rxjs_1.of(path_1.resolve(process.cwd(), this.angularJsonPath.value))
            .pipe(operators_1.concatMap(function (where) { return server_disk_1.readFileRx(where); }), operators_1.map(function (contents) { return JSON.parse(contents); }), operators_1.shareReplay(1));
    };
    AngularService.prototype.getProjects = function () {
        return this.getAngularJson().pipe(operators_1.map(function (j) { return j.projects; }));
    };
    AngularService.prototype.getProjectKeys = function () {
        return this.getProjects().pipe(operators_1.map(function (j) { return !j.projects ? [] : Object.keys(j.projects).sort(); }));
    };
    AngularService.prototype.buildProject = function (projectName, node) {
        if (node === void 0) { node = true; }
        return server_process_1.execRx("ng build " + projectName + (node ? '' : '--output-hashing none --base-href ./'))
            .pipe(operators_1.filter(function (v) { return !!v; }), operators_1.last(), operators_1.catchError(function (e) {
            // output for manually adding to angular.json
            throw new Error((e === null || e === void 0 ? void 0 : e.message) ? " " + e.message : (e || 'errrrrr'));
        }));
    };
    AngularService.prototype.getProject = function (name) {
        return this.getProjects().pipe(operators_1.map(function (pjs) { return pjs[name]; }));
    };
    AngularService.prototype.getProjectOutputPath = function (name, cwd) {
        return this.getProject(name).pipe(operators_1.map(function (pj) {
            var outputPath = pj.architect.build.options.outputPath;
            return cwd ? path_1.resolve(cwd, outputPath) : outputPath;
        }));
    };
    AngularService = __decorate([
        common_1.Injectable()
    ], AngularService);
    return AngularService;
}());
exports.AngularService = AngularService;
