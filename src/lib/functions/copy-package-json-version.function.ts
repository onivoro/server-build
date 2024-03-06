import { parsePackageJson } from '@onivoro/server-common';
import { writeFile } from 'fs/promises';

export async function copyPackageJsonVersion(appRoot: string) {
    const targetPackagePath = `${appRoot}/package.json`;
    const pkg = await parsePackageJson();
    const { version } = pkg;
    const targetPkg = await parsePackageJson(targetPackagePath);
    await writeFile(targetPackagePath, JSON.stringify({ ...targetPkg, version }, null, 2), 'utf-8');
}