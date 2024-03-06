import { Command } from 'nest-commander';
import { buildApp } from '../functions/build-app.function';
import { deployLambda } from '../functions/deploy-lambda.function';
import { AbstractAwsLambdaCommand } from './abstract-aws-lambda.command';
import { IAwsLambdaConfigParams } from '../types/aws-lambda-config-params.interface';

@Command({ name: DeployLambda.name })
export class DeployLambda extends AbstractAwsLambdaCommand<IAwsLambdaConfigParams> {
  constructor() {
    super(DeployLambda.name);
  }

  async main(
    _args: string[],
    params: IAwsLambdaConfigParams
  ): Promise<void> {
    buildApp(params.app, 'production');
    deployLambda(
      params,
      false,
    );
  }
}
