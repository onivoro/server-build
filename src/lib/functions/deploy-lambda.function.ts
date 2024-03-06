import { spawnSync } from 'child_process';
import { IAwsLambdaConfigParams } from '../types/aws-lambda-config-params.interface';
import { buildApp } from './build-app.function';
import { shell } from './shell.function';
import { zipDirectory } from './zip-directory.function';

const opts = { encoding: 'utf8' } as any;

export async function deployLambda(
  params: IAwsLambdaConfigParams,
  update: boolean,
) {
  const {
    app,
    region,
    profile,
    role: lambdaRole,
    bucket,
    source,
    lambdaName: artifactName,
    prefix } = params;
  const srcFolderPath = source || ('apps/lambda/' + app.replace('lambda-', ''));
  const dist = `dist/${srcFolderPath}`;
  const zipFolderPath = 'zips/';
  const zip = `${zipFolderPath}${app}.zip`;

  buildApp(app, 'production');
  spawnSync('npm', [`i`, '--force'], { ...opts, cwd: dist });
  shell(`mkdir -p ${zipFolderPath}`);

  await zipDirectory(dist, zip);

  const s3Key = `${artifactName}.zip`;

  shell(`aws s3 cp ${zip} s3://${bucket}/${s3Key} --profile ${profile}`);

  const envVars = Object.entries(process.env)
    .filter(([k]) => !prefix || k.startsWith(prefix))
    .map(([k, v]) => !prefix ? [k, v] : [k.replace(prefix, ''), v])
    .filter(
      ([k]) =>
        !['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION'].includes(
          k
        )
    );

  const varExp = envVars.map(([k, v]) => `${k}=${v}`).join(',');

  const cmd = update
    ? `aws lambda update-function-code --function-name "${artifactName}" --region ${region} --s3-bucket ${bucket} --s3-key ${s3Key} --publish --profile ${profile}`
    : `aws lambda create-function --function-name "${artifactName}" --region ${region} --timeout 900 --handler "main.handler" --role "${lambdaRole}" --runtime "nodejs16.x" --code "S3Bucket=${bucket},S3Key=${s3Key}" --package-type Zip --publish --profile ${profile} --memory-size 1024 --environment "Variables={${varExp}}"`;

  shell(cmd);
}
