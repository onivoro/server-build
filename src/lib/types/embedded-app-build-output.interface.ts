export interface IEmbeddedAppBuildOutput {
    app: string;
    html: string;
    fileMappings: {
        original: string;
        modified: string;
        key: string;
        ext: string;
        contentType: 'text/javascript' | 'text/css';
    }[];
}
