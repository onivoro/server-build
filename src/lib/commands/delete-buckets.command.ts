import { Command, Option } from 'nest-commander';
import { AbstractAwsCommand } from './abstract-aws.command';
import { IAwsParams } from '../types/aws-params.interface';
import { shell } from '../functions/shell.function';

type IParams = IAwsParams & { like: string };

@Command({ name: DeleteBuckets.name })
export class DeleteBuckets extends AbstractAwsCommand<IAwsParams> {

    async main(args: string[], { like, profile, region }: IParams): Promise<void> {
        const buckets = shell(`aws s3 ls --profile ${profile} --region ${region} | grep '${like}'`)
            .split('\n')
            .filter(Boolean)
            .map(line => line.split(' '))
            .map(([date, time, bucket]) => bucket);
        buckets.forEach((bucket) => {
            shell(`aws s3 rm --recursive --profile ${profile} --region ${region} s3://${bucket}/`);
            shell(`aws s3 rb --profile ${profile} --region ${region} s3://${bucket}/`);
        });
    }

    constructor() {
        super(DeleteBuckets.name);
    }

    @Option({
        flags: '-l, --like [like]',
        description: 'case-sensitive filter to match bucket names against',
        required: true
    })
    parseLike(val?: string) {
        return val;
    }
}
