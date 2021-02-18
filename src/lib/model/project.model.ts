import { ProjectScope } from "../enum/project-scope.enum";
import { ProjectType } from "../enum/project-type.enum";
const segmentsToDrop = ['apps', 'libs', 'agnostic'];

export class ProjectModel {
    readonly npmScope = 'onivoro';
    readonly sourceControlRemoteHost = 'github.com'
    get repositoryUrl () {
        return `https://${this.sourceControlRemoteHost}/${this.npmScope}/${this.name}.git`;
    }
    get packageJson() {
        return `${this.root}/package.json`;
    }
    get index() {
        return this.scope === ProjectScope.browser ? `${this.sourceRoot}/index.html` : `${this.sourceRoot}/index.ts`
    }
    get polyfills() {
        return this.scope === ProjectScope.browser ? `${this.sourceRoot}/polyfills.ts` : undefined;
    }
    constructor(public readonly root: string) {
    }
    get builder() {
        return this.scope === ProjectScope.server ? "@nrwl/node:build" : '';
    }
    get outputPath() { return `dist/${this.root}`; }
    get scope() {
        const segments = this.segments;

        if (segments.includes(ProjectScope.agnostic)) {
            return ProjectScope.agnostic
        } else if (segments.includes(ProjectScope.server) || segments.includes('cli')) {
            return ProjectScope.server
        } else if (segments.includes(ProjectScope.browser)) {
            return ProjectScope.browser
        }

    }
    get npmRegisteredName() {
        return `@${this.npmScope}/${this.name}`;
    }
    get main() {
        return `${this.sourceRoot}/main.ts`;
    }
    get name() {
        return this.segments.filter(s => !segmentsToDrop.includes(s)).join('-')
    }
    get prefix() { return this.npmScope }
    private get segments() {
        return this.root.split('/')
    }
    get projectType() {
        return this.root.startsWith('apps/') ? ProjectType.application : ProjectType.library;
    }
    get sourceRoot() { return `${this.root}/src`; }
    get tsConfig() {
        return `${this.root}/tsconfig.${this.projectType.substring(0, 3)}.json`;
    }

    toAngularJsonProject() {
        const base = this.toBaseAngularJsonProject();

        return base;
    }

    private getArchitectServeServerApp(): any {
        return {
            builder: "@nrwl/node:execute",
            options: {
                "buildTarget": `${this.name}:build`
            }
        };
    }

    private toBaseAngularJsonProject() {
        return {
            root: this.root,
            sourceRoot: this.sourceRoot,
            projectType: this.projectType,
            prefix: this.prefix,
            schematics: this.getSchematics(),
            architect: {
                build: this.getArchitectBuild(),
                serve: this.getArchitectServe(),
                test: {
                    "builder": "@nrwl/jest:jest",
                    "options": {
                        "jestConfig": `${this.root}/jest.config.js`,
                        // "tsConfig": `${this.root}/tsconfig.spec.json`, // deprec8d
                        "passWithNoTests": true,
                        "setupFile": this.getTestSetupFile()
                    }
                },
            }
        };
    }
    getTestSetupFile() {
        return this.scope === ProjectScope.browser ? `${this.sourceRoot}/test-setup.ts` : undefined;
    }
    getSchematics() {
        return this.scope === ProjectScope.browser ? {
            "@nrwl/angular:component": {
                "styleext": "scss",
                "style": "scss"
            }
        } : {};
    }

    private getArchitectBuild() {
        switch (this.scope) {
            case ProjectScope.server:
                return this.projectType === ProjectType.application ? this.getArchitectBuildServerApp() : this.getArchitectBuildServerLibrary()
            case ProjectScope.browser:
                return this.projectType === ProjectType.application ? this.getArchitectBuildBrowserApp() : this.getArchitectBuildBrowserLibrary()
            case ProjectScope.agnostic:
                return this.getArchitectBuildServerLibrary();
            default:
                return `scope not defined for ${this.root}`
        }
    }

    private getArchitectServe() {
        switch (this.scope) {
            case ProjectScope.server:
                return this.projectType === ProjectType.application ? this.getArchitectServeServerApp() : undefined
            case ProjectScope.browser:
                return this.projectType === ProjectType.application ? this.getArchitectServeBrowserApp() : undefined
            case ProjectScope.agnostic:
                return undefined;
            default:
                return `scope not defined for ${this.root}`
        }
    }

    getArchitectServeServerLibrary() {
        return undefined;
    }
    getArchitectServeBrowserApp() {
        return {
            "builder": "@angular-devkit/build-angular:dev-server",
            "options": {
                "browserTarget": `${this.name}:build`
            },
            "configurations": {
                "production": {
                    "browserTarget": `${this.name}:build:production`
                }
            }
        };
    }
    getArchitectBuildBrowserLibrary() {
        return undefined;
    }
    getArchitectBuildServerLibrary() {
        return {
            "builder": "@nrwl/node:package",
            "options": {
                "outputPath": this.outputPath,
                "tsConfig": this.tsConfig,
                "packageJson": this.packageJson,
                "main": this.index,
                "assets": [
                    `${this.root}/*.md`
                ]
            }
        };
    }
    getArchitectBuildBrowserApp() {
        return {
            "builder": "@angular-devkit/build-angular:browser",
            "options": {
                "outputPath": this.outputPath,
                "index": this.index,
                "main": this.main,
                "polyfills": `${this.sourceRoot}/polyfills.ts`,
                "tsConfig": `${this.root}/tsconfig.app.json`,
                "aot": true,
                "assets": [
                    `${this.sourceRoot}/icon.png`,
                    `${this.sourceRoot}/assets`
                ],
                "styles": [
                    `${this.sourceRoot}/styles.scss`
                ],
                "scripts": []
            },
            "configurations": {
                "production": {
                    "fileReplacements": [
                        {
                            "replace": `${this.sourceRoot}/environments/environment.ts`,
                            "with": `${this.sourceRoot}/environments/environment.prod.ts`,
                        }
                    ],
                    "optimization": true,
                    "outputHashing": "all",
                    "sourceMap": false,
                    "namedChunks": false,
                    "extractLicenses": true,
                    "vendorChunk": false,
                    "buildOptimizer": true,
                    "budgets": [
                        {
                            "type": "initial",
                            "maximumWarning": "2mb",
                            "maximumError": "5mb"
                        },
                        {
                            "type": "anyComponentStyle",
                            "maximumWarning": "6kb",
                            "maximumError": "10kb"
                        }
                    ]
                }
            }
        };
    }
    private getArchitectBuildServerApp() {
        return {
            "builder": this.scope === ProjectScope.server ? "@nrwl/node:build" : '????? builder for browser ???????',
            "options": {
                "outputPath": this.outputPath,
                "main": `${this.sourceRoot}/main.ts`,
                "tsConfig": this.tsConfig,
                // "assets": this.projectType === ProjectType.application ? [`${this.sourceRoot}/assets`] : undefined,
            },
            "configurations": {
                "production": {
                    "optimization": true,
                    "extractLicenses": true,
                    "inspect": false,
                    "fileReplacements": [
                        {
                            "replace": `${this.sourceRoot}/environments/environment.ts`,
                            "with": `${this.sourceRoot}/environments/environment.prod.ts`
                        }
                    ]
                }
            }
        };
    }
}