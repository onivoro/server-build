import { __decorate } from "tslib";
import { Injectable } from '@nestjs/common';
let UtilService = class UtilService {
    bumpVersion(currentVersion, segment = 'patch') {
        const [major, minor, patch] = currentVersion.split('.');
        const version = { major, minor, patch };
        version[segment] = `${Number(version[segment]) + 1}`;
        return [version.major, version.minor, version.patch].join('.');
    }
};
UtilService = __decorate([
    Injectable()
], UtilService);
export { UtilService };
//# sourceMappingURL=util.service.js.map