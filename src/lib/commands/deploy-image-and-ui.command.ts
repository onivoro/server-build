import { Command, Option } from 'nest-commander';
import { buildApp } from '../functions/build-app.function';
import { logElapsedTime } from '../functions/log-elapsed-time.function';
import { loginToEcr } from '../functions/login-to-ecr.function';
import { pushImageToEcr } from '../functions/push-image-to-ecr.function';
import { IAwsEcsParams } from '../types/aws-ecs-params.interface';
import { AbstractAwsEcsCommand } from './abstract-aws-ecs.command';
import { parseDockerImagePath } from '../functions/parse-docker-image-path.function';
import { buildImageUnopinionated } from '../functions/build-image-unopinionated.function';
import { execSync } from 'child_process';
import { BadRequestException } from '@nestjs/common';

type IParams = IAwsEcsParams & { uiName: string, uiDist: string, dockerfile: string, dockerArg: string }

@Command({ name: DeployImageAndUi.name })
export class DeployImageAndUi extends AbstractAwsEcsCommand<IParams> {
  constructor() {
    super(DeployImageAndUi.name);
  }

  async main(
    _args: string[],
    { app, target, ecr, region, profile, appRoot, uiName, uiDist, dockerfile }: IParams
  ): Promise<void> {
    const executionStart = new Date();

    buildApp(app, 'production');

    try {
      buildApp(uiName, target as any);
      execSync(`cp -R ${uiDist} dist/${appRoot}/assets/ui`);
    } catch (e) {
      console.log(e);
    }

    const { repo, repoColonTag } = parseDockerImagePath(ecr);

    if (typeof repoColonTag === 'undefined') {
      throw new BadRequestException(`expected ecr format "repo:tag" but received "${ecr}`)
    }

    buildImageUnopinionated(repoColonTag, dockerfile, `APP_DIST=./dist/${appRoot}`);
    loginToEcr(profile, region, repo);
    pushImageToEcr(repoColonTag);
    logElapsedTime(executionStart, DeployImageAndUi.name);
  }

  @Option({
    flags: '-u, --ui-name [uiName]',
    description: 'NX ui app name (found in project.json)',
    required: true
  })
  parseUiName(val?: string) {
    return val;
  }

  @Option({
    flags: '-d, --ui-dist [uiDist]',
    description: 'NX ui app dist folder (found in project.json or vite config)',
    required: true
  })
  parseUiDist(val?: string) {
    return val;
  }

  @Option({
    flags: '-f, --dockerfile [dockerfile]',
    description: 'dockerfile path',
    required: true
  })
  parseDockerfile(val?: string) {
    return val;
  }

  @Option({
    flags: '-g, --docker-arg [dockerArg]',
    description: 'dockerfile arg... like "APP=blah"',
    required: true
  })
  parseDockerArg(val?: string) {
    return val;
  }
}
