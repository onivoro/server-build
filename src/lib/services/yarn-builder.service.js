import { __decorate } from "tslib";
import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
// import { IAngularJson } from './models/i-angular-json';
// import { INxJson } from './models/i-nx-json';
let YarnBuilderService = class YarnBuilderService {
    // build(skipInstall?: boolean) {
    //   !skipInstall && this.install(false);
    //   this.exec('');
    // }
    install(prod) {
        return this.exec('yarn install --focus --frozen-lockfile --ignore-scripts --no-audit --ignore-optional' + (prod ? ' --production=true --no-bin-links' : ''));
    }
    exec(cmd) {
        return execSync(cmd, { encoding: 'utf8', cwd: this.cwd }).toString();
    }
};
YarnBuilderService = __decorate([
    Injectable()
], YarnBuilderService);
export { YarnBuilderService };
//# sourceMappingURL=yarn-builder.service.js.map