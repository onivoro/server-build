import { shell } from './shell.function';

export function pushImageToEcr(
  repoColonTag: string
) {

  shell([`docker`, 'push', `${repoColonTag}`].join(' '));
}
