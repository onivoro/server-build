import { AwsService } from './aws.service';

export class S3Service extends AwsService {

    constructor(props: { endpointUrl: string, profile: string, execRx?: any }) {
        super(props);
    }

    clean(targetPath: string) {
        const cmd = [
            `${this.program} s3 rm ${this.resolve(targetPath)} --recursive `,
        ].join(' && ')

        return this.exec(cmd);
    }

    publish(sourcePath: string, targetPath: string) {
        const cmd = [
            `${this.program} s3 cp ${sourcePath} ${this.resolve(targetPath)} --acl public-read --recursive`
        ].join(' && ')

        return this.exec(cmd);
    }

    private resolve(targetPath: string) {
        return `s3://${targetPath}/`.replace('s3://s3://', 's3://');
    }
}