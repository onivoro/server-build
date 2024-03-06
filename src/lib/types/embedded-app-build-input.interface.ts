export interface IEmbeddedAppBuildInput {
    app: string,
    bucket: string,
    region: string,
    assetRoot: string,
    omitAcl?: boolean,
    target?: string,
};