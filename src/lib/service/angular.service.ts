import { Injectable } from '@nestjs/common';
import { readObjectRx, writeObjectRx } from '@onivoro/server-disk';
import { execRx } from '@onivoro/server-process';
import { resolve } from 'path';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, filter, last, map, shareReplay } from 'rxjs/operators';
import { AngularJsonPath } from '../env/angular-json-path';
import { IAngularJson } from '../interface/angular-json.interface';
import { IAngularProject } from '../interface/angular-project.interface';

@Injectable()
export class AngularService {

    save(updatedJson: IAngularJson) {
        return of(this.angularJsonPath.value)
            .pipe(
                concatMap(where => writeObjectRx(where, updatedJson))
            );
    }

    constructor(
        private readonly angularJsonPath: AngularJsonPath,
    ) { }

    getAngularJson(): Observable<IAngularJson> {
        return of(this.angularJsonPath.value)
            .pipe(
                concatMap(where => readObjectRx(where)),
                shareReplay(1)
            );
    }

    getProjects(): Observable<{ [name: string]: IAngularProject }> {
        return this.getAngularJson().pipe(map(j => j.projects));
    }

    getProjectKeys() {
        return this.getProjects().pipe(map(pjs => Object.keys(pjs).sort()));
    }

    buildProject(projectName: string, node = true) {
        return execRx(`ng build ${projectName}${node ? '' : '--output-hashing none --base-href ./'}`)
            .pipe(
                filter(v => !!v),
                last(),
                catchError((e: any) => {
                    // output for manually adding to angular.json
                    throw new Error(e?.message ? ` ${e.message}` : (e || 'errrrrr'));
                }),
            );
    }

    getProject(name: string) {
        return this.getProjects().pipe(map(pjs => pjs[name]));
    }

    getProjectOutputPath(name: string, cwd: string) {
        return this.getProject(name).pipe(
            map((pj: IAngularProject) => {
                const { outputPath } = pj.architect.build.options;

                return cwd ? resolve(cwd, outputPath) : outputPath;
            }),
        );
    }
}