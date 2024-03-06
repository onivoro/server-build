import { CommandRunner, Option } from 'nest-commander';
import { logElapsedTime } from '../functions/log-elapsed-time.function';
import { IAwsParams } from '../types/aws-params.interface';

export abstract class AbstractAwsCommand<TParams extends IAwsParams> extends CommandRunner {
  abstract main(args: string[], params: TParams): Promise<void>;

  constructor(public name: string) {
    super();
  }

  async run(_args: string[], params: TParams): Promise<void> {
    const executionStart = new Date();
    await this.main(_args, params);
    logElapsedTime(executionStart, this.name);
  }

  @Option({
    flags: '-p, --profile [profile]',
    description:
      'AWS profile name',
    required: true
  })
  parseProfile(val?: string) {
    return val;
  }

  @Option({
    flags: '-r, --region [region]',
    description: 'AWS region',
    required: true
  })
  parseRegion(val?: string) {
    return val;
  }
}
