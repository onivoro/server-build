import { shell } from './shell.function';

export function loginToEcrByProfile(
  region: string,
  ecr: string,
  accessKey: string,
  secretKey: string,
  profile: string
) {
  shell(`aws configure set ${profile}.region ${region}`);
  shell(`aws configure set ${profile}.aws_access_key_id ${accessKey}`);
  shell(`aws configure set ${profile}.aws_secret_access_key ${secretKey}`);
  shell(
    `aws ecr get-login-password --region ${region} --profile ${profile} | docker login --username AWS --password-stdin ${ecr}`
  );
}
