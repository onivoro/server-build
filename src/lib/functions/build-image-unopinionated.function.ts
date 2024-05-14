import { shell } from './shell.function';

export function buildImageUnopinionated(app: string, repoColonTag: string, dockerfile: string) {
  shell(
    [
      'docker',
      'build',
      '--build-arg',
      `APP=${app}`,
      '-f',
      dockerfile,
      '-t',
      repoColonTag,
      '.',
    ].join(' ')
  );
}
