import { IAwsAppParams } from './aws-app-params.interface';

export interface IAwsEcsParams extends IAwsAppParams {
  ecr: string;
}
