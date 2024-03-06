import { shell } from './shell.function';

export function buildApp(app: string, target: string) {
  shell(
    ['npx', 'nx', 'run', `${app}:build:${target}`, '--skip-nx-cache'].join(
      ' '
    )
  );
}
