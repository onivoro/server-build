import { CommandRunner } from 'nest-commander';
import { logElapsedTime } from '../functions/log-elapsed-time.function';

export abstract class AbstractCommand<TParams> extends CommandRunner {
  abstract main(args: string[], params: TParams): Promise<void>;

  constructor(public name: string) {
    super();
  }

  async run(_args: string[], params: TParams): Promise<void> {
    const executionStart = new Date();
    await this.main(_args, params);
    logElapsedTime(executionStart, this.name);
  }
}
