import { ProjectType } from "../enum/project-type.enum";
import { ProjectScope } from "../enum/project-scope.enum";
import { ProjectModel } from "./project.model";
import { writeFileSync } from "fs";

// const serverLib = 'libs/server/feature';
// const serverApp = 'apps/feature/server';

describe(ProjectModel.name, () => {
    describe('getters', () => {
        it('worx', () => {
            const pj = new ProjectModel('libs/server/feature');

            expect(pj.root).toEqual("libs/server/feature");
            expect(pj.sourceRoot).toEqual('libs/server/feature/src');

            expect(pj.outputPath).toEqual('dist/libs/server/feature');
            expect(pj.scope).toEqual(ProjectScope.server);
            expect(pj.name).toEqual('server-feature');
            expect(pj.projectType).toEqual(ProjectType.library);
            expect(pj.tsConfig).toEqual('libs/server/feature/tsconfig.lib.json');
        });
    });

    describe(ProjectModel.prototype.toAngularJsonProject.name, () => {
        it('worx for server apps', () => {
            const pj = new ProjectModel('apps/oni/cli');
            const json = pj.toAngularJsonProject();
            writeFileSync(`${pj.name}.json`, JSON.stringify(json, null, 2))
            expect(json).toMatchSnapshot()
        });
    });
});