import { Command } from 'nest-commander';
import { shell } from '../functions/shell.function';
import { AbstractAwsAppCommand } from './abstract-aws-app.command';
import { IAwsLambdaParams } from '../types/aws-lambda-params.interface';

@Command({ name: DeleteLambda.name })
export class DeleteLambda extends AbstractAwsAppCommand<IAwsLambdaParams> {
  constructor() {
    super(DeleteLambda.name);
  }

  async run(
    _args: string[],
    params: IAwsLambdaParams
  ): Promise<void> {
    return this.main([], params);
  }

  async main(
    _args: string[],
    { region, profile, lambdaName }: IAwsLambdaParams
  ): Promise<void> {
    shell(
      `aws lambda delete-function --function-name "${lambdaName}" --region ${region} --profile ${profile}`
    );
  }
}
