import { __decorate, __metadata } from "tslib";
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { NxJsonPath } from '../env/nx-json-path';
let NxService = class NxService {
    constructor(nxJsonPath) {
        this.nxJsonPath = nxJsonPath;
    }
    getProjectKeys() {
        const where = resolve(process.cwd(), this.nxJsonPath.value);
        const nxJson = JSON.parse(readFileSync(where, 'utf8'));
        return Object.keys(nxJson.projects).sort();
    }
};
NxService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [NxJsonPath])
], NxService);
export { NxService };
//# sourceMappingURL=nx.service.js.map