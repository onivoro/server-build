import { Module } from '@nestjs/common';
import { DeployLambda } from './commands/deploy-lambda.command';
import { DeployImage } from './commands/deploy-image.command';
import { RedeployLambda } from './commands/reddeploy-lambda.command';
import { DeleteLambda } from './commands/delete-lambda.command';
import { OpenapiGen } from './commands/openapi-gen.command';
import { OpenapiGenV2 } from './commands/openapi-gen-v2.command';
import { KillTasks } from './commands/kill-tasks.command';
import { DeleteBuckets } from './commands/delete-buckets.command';

export const providers = [
  DeployLambda,
  RedeployLambda,
  DeployImage,
  DeleteBuckets,
  DeleteLambda,
  OpenapiGen,
  OpenapiGenV2,
  KillTasks
];

@Module({
   providers
})
export class ServerBuildModule {}
