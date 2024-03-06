import { IAppParams } from './app-params.interface';
import { IAwsParams } from './aws-params.interface';

export type IAwsAppParams = IAppParams & IAwsParams & {
  target: string;
}
