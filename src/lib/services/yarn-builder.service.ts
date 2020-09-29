import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
// import { IAngularJson } from './models/i-angular-json';
// import { INxJson } from './models/i-nx-json';

@Injectable()
export class YarnBuilderService {
  cwd: string;

  // build(skipInstall?: boolean) {
  //   !skipInstall && this.install(false);
  //   this.exec('');
  // }

  install(prod: boolean) {
    return this.exec('yarn install --focus --frozen-lockfile --ignore-scripts --no-audit --ignore-optional' + (prod ? ' --production=true --no-bin-links' : ''));
  }

  private exec(cmd: string) {
    return execSync(cmd, { encoding: 'utf8', cwd: this.cwd }).toString();
  }
}
