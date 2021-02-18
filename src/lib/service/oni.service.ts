import { Injectable } from '@nestjs/common';
import { readObjectRx, writeObjectRx } from '@onivoro/server-disk';
import { resolve } from 'path';
import { of } from 'rxjs';
import { catchError, concatMap, finalize, map, tap } from 'rxjs/operators';
import { OniJsonPath } from '../env/oni-json-path';
import { IAngularJson } from '../interface/angular-json.interface';
import { ProjectModel } from '../model/project.model';
import { PackageJsonTemplatePipe } from '../templates/package-json-template.pipe';
import { AngularService } from './angular.service';

@Injectable()
export class OniService {
    constructor(
        private readonly oniJsonPath: OniJsonPath,
        private readonly packageJsonTemplate: PackageJsonTemplatePipe,
        private readonly angularService: AngularService
    ) { }

    getOrCreatePackageJson(path: string, name: string) {
        return readObjectRx(path).pipe(
            catchError(() => this.createPackageJson(path, name))
        );
    }

    readOniJson() {
        return readObjectRx(resolve(process.cwd(), this.oniJsonPath.value()));
    }

    readProject(name: string) {
        return this.readOniJson().pipe(
            map(pjs => pjs.projects[name])
        );
    }

    readProjectVersionLegacy(name: string) {
        return this.readProject(name).pipe(
            map(pj => pj.version)
        );
    }

    readProjectVersion(distPackageJsonPath: string) {
        return readObjectRx(distPackageJsonPath).pipe(
            map(contents => contents.version),
            catchError(() => of(null))
        );
    }

    writeOniJson(json: object) {
        return writeObjectRx(resolve(process.cwd(), this.oniJsonPath.value()), json);
    }

    writePackageJsonVersion(packageJsonPath: string, version: string): any {
        return readObjectRx(packageJsonPath).pipe(
            concatMap(contents => {
                contents.version = version;

                return writeObjectRx(packageJsonPath, contents);
            }),
        );
    }

    createPackageJson(path: string, name: string): any {
        const body = this.packageJsonTemplate.transform({ name });

        return writeObjectRx(path, body).pipe(map(() => body));
    }

    writeProjectVersion(projectName: string, versionToPublish: string): any {
        return this.readOniJson().pipe(
            concatMap((json) => {
                json.projects[projectName].version = versionToPublish;

                return this.writeOniJson(json);
            })
        );
    }

    synthesizeProjectDefinitionFromDirectory(root: string) {
        const pj = new ProjectModel(root);
        return {
            [pj.name]: pj.toAngularJsonProject()
        };
    }

    overwriteAngularJson(root: string, name='') {
        let json: IAngularJson;
        let updatedJson: IAngularJson;
        return this.angularService.getAngularJson().pipe(
            tap(j => (json = j)),
            map(() => new ProjectModel(root)),
            map(pjm => ({ [name || pjm.name]: pjm.toAngularJsonProject() })),
            map(projectJson => ({ ...json, projects: { ...json.projects, ...projectJson } } as IAngularJson)),
            tap(ngJson => (updatedJson = ngJson)),
            tap(() => console.log(updatedJson)),
            finalize(() => this.angularService.save(updatedJson).subscribe())
        );
    }
}