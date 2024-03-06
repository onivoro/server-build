import { IAwsAppParams } from "./aws-app-params.interface";

export interface IAwsLambdaParams extends IAwsAppParams {
    lambdaName: string;
};
