export interface IAngularProject {
    root: string;
    sourceRoot: string;
    projectType: string;
    schematics: any;
    architect: {
        test: any;
        build: {
            builder: string;
            options: {
                outputPath: string;
                tsConfig: string;
                packageJson: string;
                main: string;
                assets: string;
            }
        },
        serve: any;
    };

}