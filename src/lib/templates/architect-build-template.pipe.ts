export class ArchitectBuildTemplatePipe {
    transform({ name }: { name: string }) {
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
}