import { Injectable } from '@nestjs/common';
import { readFileRx } from '@onivoro/server-disk';
import { execRx } from '@onivoro/server-process';
import { resolve } from 'path';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, filter, last, map, shareReplay } from 'rxjs/operators';
import { AngularJsonPath } from '../env/angular-json-path';
import { IAngularProject } from '../models/i-angular-project';
// import { ArchitectBuildTemplatePipe } from '../templates/architect-build-template.pipe';

@Injectable()
export class AngularService {
    constructor(
        private readonly angularJsonPath: AngularJsonPath,
        // private readonly architectBuildTemplate: ArchitectBuildTemplatePipe,
    ) { }

    getAngularJson() {
        return of(resolve(process.cwd(), this.angularJsonPath.value as string))
            .pipe(
                concatMap(where => readFileRx(where)),
                map(contents => JSON.parse(contents as string)),
                shareReplay(1)
            );
    }

    getProjects(): Observable<{[name: string]: IAngularProject }> {
        return this.getAngularJson().pipe(map(j => j.projects));
    }

    getProjectKeys() {
        return this.getProjects().pipe(map(j => !j.projects ? [] : Object.keys(j.projects).sort()));
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