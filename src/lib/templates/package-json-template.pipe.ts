export class PackageJsonTemplatePipe {
    transform({ name }: { name: string }) {
        return { name: `@onivoro/${name}`, version: '0.0.0' };
    }
}
