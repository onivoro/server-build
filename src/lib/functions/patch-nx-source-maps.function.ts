import { relative } from 'node:path';

export type TFilenameTemplater = (info: { absoluteResourcePath: string }) => string;

export function patchNxSourceMapPaths(config: { output: { devtoolModuleFilenameTemplate: TFilenameTemplater } }) {
    config.output.devtoolModuleFilenameTemplate = function (info) {
        const rel = relative(process.cwd(), info.absoluteResourcePath);
        return `webpack:///./${rel}`;
    };
    return config;
};