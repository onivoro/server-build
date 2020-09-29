import { __decorate } from "tslib";
import { Injectable } from '@nestjs/common';
let PackageJsonTemplatePipe = class PackageJsonTemplatePipe {
    transform({ name }) {
        return { name: `@onivoro/${name}`, version: '0.0.0' };
    }
};
PackageJsonTemplatePipe = __decorate([
    Injectable()
], PackageJsonTemplatePipe);
export { PackageJsonTemplatePipe };
//# sourceMappingURL=package-json-template.pipe.js.map