const COLON = ':';

export function parseDockerImagePath(input: string) {
  const [repo, tag] = input.split(COLON);
  const repoColonTag = repo && tag ? `${repo}${COLON}${tag}` : undefined;

  return { repo, tag, repoColonTag };
}
