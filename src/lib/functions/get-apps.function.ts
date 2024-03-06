import { getProjects } from './get-projects.function';

export function getApps(filter?: string) {
  return Object.keys(getProjects()).filter(
    (pj) => !filter || pj.includes(filter)
  );
}
