import { shell } from './shell.function';

export function loginToEcr(
  profile: string,
  region: string,
  ecr: string,
) {
  shell(
    `aws ecr get-login-password --region ${region} --profile ${profile} | docker login --username AWS --password-stdin ${ecr}`
  );
}
