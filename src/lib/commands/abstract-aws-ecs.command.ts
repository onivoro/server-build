import { Option } from 'nest-commander';
import { IAwsEcsParams } from '../types/aws-ecs-params.interface';
import { AbstractAwsAppCommand } from './abstract-aws-app.command';

export abstract class AbstractAwsEcsCommand<TParams extends IAwsEcsParams> extends AbstractAwsAppCommand<TParams> {
  abstract main(args: string[], params: TParams): Promise<void>;

  constructor(public name: string) {
    super(name);
  }

  async run(_args: string[], params: TParams): Promise<void> {
    await this.main(_args, params);
  }

  @Option({
    flags: '-e, --ecr [ecr]',
    description:
      'url of the Elastic Container Registry (ECR) including the tag, example "my.repo.url:my-tagname"',
    required: true
  })
  parseEcr(val?: string) {
    return val;
  }
}
