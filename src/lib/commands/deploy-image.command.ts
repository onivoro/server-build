import { Command } from 'nest-commander';
import { buildApp } from '../functions/build-app.function';
import { buildImage } from '../functions/build-image.function';
import { copyPackageJsonVersion } from '../functions/copy-package-json-version.function';
import { logElapsedTime } from '../functions/log-elapsed-time.function';
import { loginToEcr } from '../functions/login-to-ecr.function';
import { pushImageToEcr } from '../functions/push-image-to-ecr.function';
import { IAwsEcsParams } from '../types/aws-ecs-params.interface';
import { AbstractAwsEcsCommand } from './abstract-aws-ecs.command';
import { parseDockerImagePath } from '../functions/parse-docker-image-path.function';

type IParams = IAwsEcsParams;

@Command({ name: DeployImage.name })
export class DeployImage extends AbstractAwsEcsCommand<IAwsEcsParams> {
  constructor() {
    super(DeployImage.name);
  }

  async main(
    _args: string[],
    { app, target, ecr, region, profile, appRoot }: IParams
  ): Promise<void> {
    const executionStart = new Date();
    try {
      await copyPackageJsonVersion(appRoot);
    } catch (error) {
      console.log('failed to upload package.json version', error);
    }
    buildApp(app, 'production');
    if (app.includes('api-')) {
      try {
        buildApp(app.replace('api-', 'ui-'), target as any);
      } catch (e) {
        console.log(e);
      }
    }
    const { repo, repoColonTag } = parseDockerImagePath(ecr);
    buildImage(app, repoColonTag || ecr, appRoot);
    loginToEcr(profile, region, repo);
    pushImageToEcr(repoColonTag || ecr);
    logElapsedTime(executionStart, DeployImage.name);
  }
}
