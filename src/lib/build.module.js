"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.BuildModule = void 0;
var common_1 = require("@nestjs/common");
var angular_json_path_1 = require("./env/angular-json-path");
var nx_json_path_1 = require("./env/nx-json-path");
var oni_json_path_1 = require("./env/oni-json-path");
var angular_service_1 = require("./services/angular.service");
var nx_service_1 = require("./services/nx.service");
var oni_service_1 = require("./services/oni.service");
var publisher_service_1 = require("./services/publisher.service");
var util_service_1 = require("./services/util.service");
var yarn_builder_service_1 = require("./services/yarn-builder.service");
var architect_build_template_pipe_1 = require("./templates/architect-build-template.pipe");
var package_json_template_pipe_1 = require("./templates/package-json-template.pipe");
var env = [
    angular_json_path_1.AngularJsonPath,
    nx_json_path_1.NxJsonPath,
    oni_json_path_1.OniJsonPath
];
var services = [
    angular_service_1.AngularService,
    nx_service_1.NxService,
    oni_service_1.OniService,
    publisher_service_1.PublisherService,
    util_service_1.UtilService,
    yarn_builder_service_1.YarnBuilderService,
];
var templates = [architect_build_template_pipe_1.ArchitectBuildTemplatePipe, package_json_template_pipe_1.PackageJsonTemplatePipe];
var providers = __spreadArrays(env, services, templates);
var BuildModule = /** @class */ (function () {
    function BuildModule() {
    }
    BuildModule = __decorate([
        common_1.Module({
            providers: providers,
            exports: providers
        })
    ], BuildModule);
    return BuildModule;
}());
exports.BuildModule = BuildModule;
