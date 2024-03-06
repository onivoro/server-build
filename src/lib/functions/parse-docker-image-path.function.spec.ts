import { parseDockerImagePath } from './parse-docker-image-path.function';

describe('parseDockerImagePath', () => {
  describe('GIVEN the tag is present', () => {
    it.each([
      ['314218077608.dkr.ecr.us-east-2.amazonaws.com/evolve:api-account',],
    ])('returns repo, tag, and the combination thereof', (input) => {
      expect(parseDockerImagePath(input)).toMatchSnapshot();
    });
  });

  describe('GIVEN the tag is absent', () => {
    it.each([
      ['314218077608.dkr.ecr.us-east-2.amazonaws.com/evolve',],
    ])('returns repo', (input) => {
      expect(parseDockerImagePath(input)).toMatchSnapshot();
    });
  });
});