import { CommandRunner, Option } from 'nest-commander';
import { logElapsedTime } from '../functions/log-elapsed-time.function';
import { IAppParams } from '../types/app-params.interface';

export abstract class AbstractAppCommand<TParams extends IAppParams> extends CommandRunner {
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
    flags: '-a, --app [app]',
    description: 'NX app name (found in workspace.json)',
    required: true
  })
  parseApp(val?: string) {
    return val;
  }
}
