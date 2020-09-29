"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.YarnBuilderService = void 0;
var common_1 = require("@nestjs/common");
var child_process_1 = require("child_process");
// import { IAngularJson } from './models/i-angular-json';
// import { INxJson } from './models/i-nx-json';
var YarnBuilderService = /** @class */ (function () {
    function YarnBuilderService() {
    }
    // build(skipInstall?: boolean) {
    //   !skipInstall && this.install(false);
    //   this.exec('');
    // }
    YarnBuilderService.prototype.install = function (prod) {
        return this.exec('yarn install --focus --frozen-lockfile --ignore-scripts --no-audit --ignore-optional' + (prod ? ' --production=true --no-bin-links' : ''));
    };
    YarnBuilderService.prototype.exec = function (cmd) {
        return child_process_1.execSync(cmd, { encoding: 'utf8', cwd: this.cwd }).toString();
    };
    YarnBuilderService = __decorate([
        common_1.Injectable()
    ], YarnBuilderService);
    return YarnBuilderService;
}());
exports.YarnBuilderService = YarnBuilderService;
