import { execRx } from '@onivoro/server-process';
import { AwsService } from './aws.service';

export class S3Service {
    aws: AwsService;

    constructor(props: { endpointUrl: string }) {
        this.aws = new AwsService(props);
    }

    publish(sourcePath: string, targetPath: string) {
        const cmd = [
            `${this.aws.program} s3 rm ${this.resolve(targetPath)} --recursive `,
            `${this.aws.program} s3 cp ${sourcePath} ${this.resolve(targetPath)} --acl public-read --recursive`
        ].join(' && ')

        return execRx(cmd);
    }

    resolve(targetPath: string) {
        return `s3://${targetPath}/`.replace('s3://s3://', 's3://');
    }
}