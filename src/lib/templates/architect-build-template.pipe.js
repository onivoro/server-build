import { __decorate } from "tslib";
import { Injectable } from '@nestjs/common';
let ArchitectBuildTemplatePipe = class ArchitectBuildTemplatePipe {
    transform({ name }) {
        const [root, ...parts] = name.split('-');
        const dir = parts.join('-');
        return `
        "build": {
            "builder": "@nrwl/node:package",
            "options": {
                "outputPath": "dist/libs/${root}/${dir}",
                "tsConfig": "libs/${root}/${dir}/tsconfig.lib.json",
                "packageJson": "libs/${root}/${dir}/package.json",
                "main": "libs/${root}/${dir}/src/index.ts",
                "assets": ["libs/${root}/${dir}/*.md"]
            }
        }
        `;
    }
};
ArchitectBuildTemplatePipe = __decorate([
    Injectable()
], ArchitectBuildTemplatePipe);
export { ArchitectBuildTemplatePipe };
//# sourceMappingURL=architect-build-template.pipe.js.map