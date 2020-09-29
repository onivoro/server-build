import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { AngularJsonPath } from './env/angular-json-path';
import { NxJsonPath } from './env/nx-json-path';
import { OniJsonPath } from './env/oni-json-path';
import { AngularService } from './services/angular.service';
import { NxService } from './services/nx.service';
import { OniService } from './services/oni.service';
import { PublisherService } from './services/publisher.service';
import { UtilService } from './services/util.service';
import { YarnBuilderService } from './services/yarn-builder.service';
import { ArchitectBuildTemplatePipe } from './templates/architect-build-template.pipe';
import { PackageJsonTemplatePipe } from './templates/package-json-template.pipe';
const env = [
    AngularJsonPath,
    NxJsonPath,
    OniJsonPath
];
const services = [
    AngularService,
    NxService,
    OniService,
    PublisherService,
    UtilService,
    YarnBuilderService,
];
const templates = [ArchitectBuildTemplatePipe, PackageJsonTemplatePipe];
const providers = [...env, ...services, ...templates];
let BuildModule = class BuildModule {
};
BuildModule = __decorate([
    Module({
        providers,
        exports: providers
    })
], BuildModule);
export { BuildModule };
//# sourceMappingURL=build.module.js.map