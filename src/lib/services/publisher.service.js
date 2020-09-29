import { __decorate, __metadata } from "tslib";
// tslint:disable:no-console
import { Injectable } from '@nestjs/common';
import { execRx } from '@onivoro/server-process';
import { resolve } from 'path';
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { AngularService } from './angular.service';
import { OniService } from './oni.service';
import { UtilService } from './util.service';
let PublisherService = class PublisherService {
    constructor(angularSvc, oniSvc, utilService) {
        this.angularSvc = angularSvc;
        this.oniSvc = oniSvc;
        this.utilService = utilService;
    }
    publishProject(projectName, cwd = '') {
        cwd = cwd || process.cwd();
        let distFolder;
        let currentVersion;
        let newVersion;
        let projectRoot;
        return this.angularSvc.getProject(projectName).pipe(tap((pj) => (distFolder = pj.architect.build.options.outputPath)), tap((pj) => (projectRoot = pj.root)), map(pj => resolve(cwd, pj.root)), concatMap((roott) => this.oniSvc.getOrCreatePackageJson(`${roott}/package.json`, projectName)), 
        // concatMap(() => this.angularSvc.getProjectOutputPath(projectName, cwd)),
        // tap(console.log.bind(console, 'got output path')),
        map((packageJson) => packageJson.version), tap((version) => {
            currentVersion = version;
            newVersion = this.utilService.bumpVersion(currentVersion);
        }), concatMap(() => this.oniSvc.writePackageJsonVersion(`${projectRoot}/package.json`, newVersion)), tap(console.log.bind(console, 'got version')), concatMap(() => this.angularSvc.buildProject(projectName, true)), tap(console.log.bind(console, 'built project')), concatMap(() => this.npmPublish(distFolder)), concatMap(() => this.publishToShadowGitRepo(projectName, projectRoot, distFolder, newVersion)));
    }
    publishToShadowGitRepo(projectName, projectRoot, _distFolder, _version) {
        // const cwd = distFolder;
        return of(null).pipe(concatMap(() => execRx(`git init`, { cwd: projectRoot }).pipe(catchError((e) => of(e)))), 
        // concatMap(() => execRx(`mv .git .git-bak`)),
        tap(console.log.bind(console, 'git init')), concatMap(() => execRx(`git add .`, { cwd: projectRoot }).pipe(catchError((e) => of(e)))), tap(() => console.log('git add .')), concatMap(() => execRx(`tit commit -am 'first' -n`, { cwd: projectRoot }).pipe(catchError((e) => of(e || 'faillll')))), tap(console.log.bind(console, `git commit -am 'first' -n`)), concatMap(() => execRx(`git remote add ${projectName} https://github.com/onivoro/${projectName}.git`, { cwd: projectRoot })), concatMap(() => execRx(`git push ${projectName}/master`, { cwd: projectRoot }))
        // concatMap(() => execRx(`mv ${distFolder} ${distFolder}-dist`)),
        // concatMap(() => execRx(`mv ${projectRoot} ${distFolder}`)),
        // concatMap(() => execRx(`mv ${distFolder}-dist ${distFolder}/dist`)),
        // catchError((e) => of(e)),
        );
    }
    npmPublish(cwd) {
        return execRx(`npm publish --access public`, { cwd });
    }
};
PublisherService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularService,
        OniService,
        UtilService])
], PublisherService);
export { PublisherService };
//# sourceMappingURL=publisher.service.js.map