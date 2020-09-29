"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PublisherService = void 0;
// tslint:disable:no-console
var common_1 = require("@nestjs/common");
var server_process_1 = require("@onivoro/server-process");
var path_1 = require("path");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var PublisherService = /** @class */ (function () {
    function PublisherService(angularSvc, oniSvc, utilService) {
        this.angularSvc = angularSvc;
        this.oniSvc = oniSvc;
        this.utilService = utilService;
    }
    PublisherService.prototype.publishProject = function (projectName, cwd) {
        var _this = this;
        if (cwd === void 0) { cwd = ''; }
        cwd = cwd || process.cwd();
        var distFolder;
        var currentVersion;
        var newVersion;
        var projectRoot;
        return this.angularSvc.getProject(projectName).pipe(operators_1.tap(function (pj) { return (distFolder = pj.architect.build.options.outputPath); }), operators_1.tap(function (pj) { return (projectRoot = pj.root); }), operators_1.map(function (pj) { return path_1.resolve(cwd, pj.root); }), operators_1.concatMap(function (roott) { return _this.oniSvc.getOrCreatePackageJson(roott + "/package.json", projectName); }), 
        // concatMap(() => this.angularSvc.getProjectOutputPath(projectName, cwd)),
        // tap(console.log.bind(console, 'got output path')),
        operators_1.map(function (packageJson) { return packageJson.version; }), operators_1.tap(function (version) {
            currentVersion = version;
            newVersion = _this.utilService.bumpVersion(currentVersion);
        }), operators_1.concatMap(function () { return _this.oniSvc.writePackageJsonVersion(projectRoot + "/package.json", newVersion); }), operators_1.tap(console.log.bind(console, 'got version')), operators_1.concatMap(function () { return _this.angularSvc.buildProject(projectName, true); }), operators_1.tap(console.log.bind(console, 'built project')), operators_1.concatMap(function () { return _this.npmPublish(distFolder); }), operators_1.concatMap(function () { return _this.publishToShadowGitRepo(projectName, projectRoot, distFolder, newVersion); }));
    };
    PublisherService.prototype.publishToShadowGitRepo = function (projectName, projectRoot, _distFolder, _version) {
        // const cwd = distFolder;
        return rxjs_1.of(null).pipe(operators_1.concatMap(function () { return server_process_1.execRx("git init", { cwd: projectRoot }).pipe(operators_1.catchError(function (e) { return rxjs_1.of(e); })); }), 
        // concatMap(() => execRx(`mv .git .git-bak`)),
        operators_1.tap(console.log.bind(console, 'git init')), operators_1.concatMap(function () { return server_process_1.execRx("git add .", { cwd: projectRoot }).pipe(operators_1.catchError(function (e) { return rxjs_1.of(e); })); }), operators_1.tap(function () { return console.log('git add .'); }), operators_1.concatMap(function () { return server_process_1.execRx("tit commit -am 'first' -n", { cwd: projectRoot }).pipe(operators_1.catchError(function (e) { return rxjs_1.of(e || 'faillll'); })); }), operators_1.tap(console.log.bind(console, "git commit -am 'first' -n")), operators_1.concatMap(function () { return server_process_1.execRx("git remote add " + projectName + " https://github.com/onivoro/" + projectName + ".git", { cwd: projectRoot }); }), operators_1.concatMap(function () {
            return server_process_1.execRx("git push " + projectName + "/master", { cwd: projectRoot });
        })
        // concatMap(() => execRx(`mv ${distFolder} ${distFolder}-dist`)),
        // concatMap(() => execRx(`mv ${projectRoot} ${distFolder}`)),
        // concatMap(() => execRx(`mv ${distFolder}-dist ${distFolder}/dist`)),
        // catchError((e) => of(e)),
        );
    };
    PublisherService.prototype.npmPublish = function (cwd) {
        return server_process_1.execRx("npm publish --access public", { cwd: cwd });
    };
    PublisherService = __decorate([
        common_1.Injectable()
    ], PublisherService);
    return PublisherService;
}());
exports.PublisherService = PublisherService;
