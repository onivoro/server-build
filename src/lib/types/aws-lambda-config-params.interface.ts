import { IAwsLambdaParams } from "./aws-lambda-params.interface";

export interface IAwsLambdaConfigParams extends IAwsLambdaParams {
    bucket: string;
    prefix?: string;
    role: string;
    source?: string;
};
