import { execRx } from '@onivoro/server-process';

export class S3PublisherService {
    static publish(sourcePath: string, targetPath: string, localStackUrl?: string) {
        const target = `s3://${targetPath}/`.replace('s3://s3://', 's3://');
        const program = localStackUrl ? `awslocal --endpoint-url=${localStackUrl}` : `aws`;

        const cmd = [
            `${program} s3 rm ${target} --recursive `,
            `${program} s3 cp ${sourcePath} ${target} --acl public-read --recursive`
        ].join(' && ')

        return execRx(cmd);
    }
}