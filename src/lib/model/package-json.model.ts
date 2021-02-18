// import { ProjectScope } from "../enum/project-scope.enum";
// import { ProjectType } from "../enum/project-type.enum";

import { ProjectModel } from "./project.model";

export class PackageJsonModel {
    pj: ProjectModel;

    constructor(public readonly root: string) {
        this.pj = new ProjectModel(root);
    }

    toPackageJson() {
        return {
            "name": this.pj.npmRegisteredName,
            "version": "0.0.1",
            "repository": {
              "url": this.pj.repositoryUrl
            },
            "scripts": {
              "test": "jest",
              "build": "tsc -p tsconfig.json",
              "release": "rm -rf dist && npm run build && npm version minor && cp package.json dist && cd dist && npm publish --scope public"
            },
            "devDependencies": {
              "@types/jest": "^26.0.14",
              "@types/node": "^14.11.2",
              "jest": "^26.4.2",
              "ts-jest": "^26.4.1",
              "typescript": "^4.0.3"
            },
            "dependencies": {
              "rxjs": "^6.6.3"
            }
          };
    }

}