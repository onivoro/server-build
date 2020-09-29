import { Injectable } from '@nestjs/common';

export type versionSegment = 'patch' | 'minor' | 'major';

@Injectable()
export class UtilService {
    bumpVersion(currentVersion: string, segment: versionSegment = 'patch'): any {
        const [major, minor, patch] = currentVersion.split('.');
        const version = { major, minor, patch };
        version[segment] = `${Number(version[segment]) + 1}`;

        return [version.major, version.minor, version.patch].join('.');
    }
}