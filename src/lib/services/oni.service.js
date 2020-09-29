import { __decorate, __metadata } from "tslib";
import { Injectable } from '@nestjs/common';
import { readObjectRx, writeObjectRx } from '@onivoro/server-disk';
import { resolve } from 'path';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { OniJsonPath } from '../env/oni-json-path';
import { PackageJsonTemplatePipe } from '../templates/package-json-template.pipe';
let OniService = class OniService {
    constructor(oniJsonPath, packageJsonTemplate) {
        this.oniJsonPath = oniJsonPath;
        this.packageJsonTemplate = packageJsonTemplate;
    }
    getOrCreatePackageJson(path, name) {
        return readObjectRx(path).pipe(catchError(() => this.createPackageJson(path, name)));
    }
    readOniJson() {
        return readObjectRx(resolve(process.cwd(), this.oniJsonPath.value));
    }
    readProject(name) {
        return this.readOniJson().pipe(map(pjs => pjs.projects[name]));
    }
    readProjectVersionLegacy(name) {
        return this.readProject(name).pipe(map(pj => pj.version));
    }
    readProjectVersion(distPackageJsonPath) {
        return readObjectRx(distPackageJsonPath).pipe(map(contents => contents.version), catchError(() => of(null)));
    }
    writeOniJson(json) {
        return writeObjectRx(resolve(process.cwd(), this.oniJsonPath.value), json);
    }
    writePackageJsonVersion(packageJsonPath, version) {
        return readObjectRx(packageJsonPath).pipe(concatMap(contents => {
            contents.version = version;
            return writeObjectRx(packageJsonPath, contents);
        }));
    }
    createPackageJson(path, name) {
        const body = this.packageJsonTemplate.transform({ name });
        return writeObjectRx(path, body).pipe(map(() => body));
    }
    writeProjectVersion(projectName, versionToPublish) {
        return this.readOniJson().pipe(concatMap((json) => {
            json.projects[projectName].version = versionToPublish;
            return this.writeOniJson(json);
        }));
    }
};
OniService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [OniJsonPath,
        PackageJsonTemplatePipe])
], OniService);
export { OniService };
//# sourceMappingURL=oni.service.js.map