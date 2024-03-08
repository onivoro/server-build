import { TWebpackConfig, patchNxSourceMapPaths } from "../functions/patch-nx-source-map-paths.function";

export function patchNxSourceMaps() {
    return (config: TWebpackConfig) => {
        patchNxSourceMapPaths(config);
        return config;
    }
}