"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArchitectBuildTemplatePipe = void 0;
var common_1 = require("@nestjs/common");
var ArchitectBuildTemplatePipe = /** @class */ (function () {
    function ArchitectBuildTemplatePipe() {
    }
    ArchitectBuildTemplatePipe.prototype.transform = function (_a) {
        var name = _a.name;
        var _b = name.split('-'), root = _b[0], parts = _b.slice(1);
        var dir = parts.join('-');
        return "\n        \"build\": {\n            \"builder\": \"@nrwl/node:package\",\n            \"options\": {\n                \"outputPath\": \"dist/libs/" + root + "/" + dir + "\",\n                \"tsConfig\": \"libs/" + root + "/" + dir + "/tsconfig.lib.json\",\n                \"packageJson\": \"libs/" + root + "/" + dir + "/package.json\",\n                \"main\": \"libs/" + root + "/" + dir + "/src/index.ts\",\n                \"assets\": [\"libs/" + root + "/" + dir + "/*.md\"]\n            }\n        }\n        ";
    };
    ArchitectBuildTemplatePipe = __decorate([
        common_1.Injectable()
    ], ArchitectBuildTemplatePipe);
    return ArchitectBuildTemplatePipe;
}());
exports.ArchitectBuildTemplatePipe = ArchitectBuildTemplatePipe;
