import { __decorate, __metadata } from "tslib";
import { Injectable } from '@nestjs/common';
import { readFileRx } from '@onivoro/server-disk';
import { execRx } from '@onivoro/server-process';
import { resolve } from 'path';
import { of } from 'rxjs';
import { catchError, concatMap, filter, last, map, shareReplay } from 'rxjs/operators';
import { AngularJsonPath } from '../env/angular-json-path';
// import { ArchitectBuildTemplatePipe } from '../templates/architect-build-template.pipe';
let AngularService = class AngularService {
    constructor(angularJsonPath) {
        this.angularJsonPath = angularJsonPath;
    }
    getAngularJson() {
        return of(resolve(process.cwd(), this.angularJsonPath.value))
            .pipe(concatMap(where => readFileRx(where)), map(contents => JSON.parse(contents)), shareReplay(1));
    }
    getProjects() {
        return this.getAngularJson().pipe(map(j => j.projects));
    }
    getProjectKeys() {
        return this.getProjects().pipe(map(j => !j.projects ? [] : Object.keys(j.projects).sort()));
    }
    buildProject(projectName, node = true) {
        return execRx(`ng build ${projectName}${node ? '' : '--output-hashing none --base-href ./'}`)
            .pipe(filter(v => !!v), last(), catchError((e) => {
            // output for manually adding to angular.json
            throw new Error((e === null || e === void 0 ? void 0 : e.message) ? ` ${e.message}` : (e || 'errrrrr'));
        }));
    }
    getProject(name) {
        return this.getProjects().pipe(map(pjs => pjs[name]));
    }
    getProjectOutputPath(name, cwd) {
        return this.getProject(name).pipe(map((pj) => {
            const { outputPath } = pj.architect.build.options;
            return cwd ? resolve(cwd, outputPath) : outputPath;
        }));
    }
};
AngularService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularJsonPath])
], AngularService);
export { AngularService };
//# sourceMappingURL=angular.service.js.map