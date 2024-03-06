import { generateAppMetadata } from '@onivoro/server-common';
import { shell } from './shell.function';

export function buildImage(project: string, repoColonTag: string, appRoot: string) {
  const {app, platform} = generateAppMetadata(project, appRoot);
  shell(
    [
      'docker',
      'build',
      '--build-arg',
      `APP=${app}`,
      '-f',
      `./docker/prod/${platform}/Dockerfile`,
      '-t',
      repoColonTag,
      '.',
    ].join(' ')
  );
}
