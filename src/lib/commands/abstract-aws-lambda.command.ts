import { Option } from 'nest-commander';
import { IAwsAppParams } from '../types/aws-app-params.interface';
import { AbstractAwsAppCommand } from './abstract-aws-app.command';

export abstract class AbstractAwsLambdaCommand<TParams extends IAwsAppParams> extends AbstractAwsAppCommand<TParams> {
  abstract main(args: string[], params: IAwsAppParams): Promise<void>;

  constructor(public name: string) {
    super(name);
  }

  async run(_args: string[], params: TParams): Promise<void> {
    await this.main(_args, params);
  }

  @Option({
    flags: '-u, --bucket [bucket]',
    description: 'S3 bucket for lambda deployment',
    required: true
  })
  parseBucket(val?: string) {
    return val;
  }

  @Option({
    flags: '-x, --prefix [prefix]',
    description: 'prefix used to filter and map env vars, ex: "TF_VAR_"',
    required: false
  })
  parsePrefix(val?: string) {
    return val;
  }

  @Option({
    flags: '-o, --role [role]',
    description: 'ARN of lambda execution role',
    required: false
  })
  parseRole(val?: string) {
    return val;
  }

  @Option({
    flags: '-s, --source [source]',
    description: 'source directory, ex: "apps/lambda-blah"',
    required: false
  })
  parseSource(val?: string) {
    return val;
  }

  @Option({
    flags: '-l, --lambdaName [lambdaName]',
    description: 'the actual name of the lambda function',
    required: false
  })
  parseLambdaName(val?: string) {
    return val;
  }
}
