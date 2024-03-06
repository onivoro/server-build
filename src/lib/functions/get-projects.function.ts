import { readFileSync } from 'fs';
import { resolve } from 'path';

export async function getProjects() {
  const { projects } = JSON.parse(
    readFileSync(resolve(process.cwd(), 'workspace.json'), {
      encoding: 'utf-8',
    })
  );
  return projects;
}
