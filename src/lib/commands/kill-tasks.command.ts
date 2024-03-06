import { Command, Option } from 'nest-commander';
import { stopAllTasks } from '../functions/stop-all-tasks.function';
import { IAwsParams } from '../types/aws-params.interface';
import { AbstractAwsCommand } from './abstract-aws.command';

type IParams = IAwsParams & { prefix: string };

@Command({ name: KillTasks.name })
export class KillTasks extends AbstractAwsCommand<IParams> {
  constructor() {
    super(KillTasks.name);
  }

  async main(
    _args: string[],
    { region, profile, prefix }: IParams
  ): Promise<void> {
    try {
      const cluster = `${prefix}-cluster`;
      const service = `${prefix}-service`;
      stopAllTasks(region, profile, cluster, service);
    } catch (error) {
      console.log('failed to kill all tasks', error);
    }
  }

  @Option({
    flags: '-x, --prefix [prefix]',
    description:
      'common prefix of the cluster and service',
    required: true
  })
  parsePrefix(val?: string) {
    return val;
  }
}
