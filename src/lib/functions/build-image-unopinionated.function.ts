import { shell } from './shell.function';

export function buildImageUnopinionated(repoColonTag: string, dockerfile: string, dockerArg: string) {
  shell(
    [
      'docker',
      'build',
      '--build-arg',
      dockerArg,
      '-f',
      dockerfile,
      '-t',
      repoColonTag,
      '.',
    ].join(' ')
  );
}
