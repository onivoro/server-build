import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { NxJsonPath } from '../env/nx-json-path';
import { INxJson } from '../models/i-nx-json';

@Injectable()
export class NxService {
    constructor(
        private readonly nxJsonPath: NxJsonPath
        ) {}

    getProjectKeys() {
        const where = resolve(process.cwd(), this.nxJsonPath.value);
        const nxJson: INxJson = JSON.parse(readFileSync(where, 'utf8'));

        return Object.keys(nxJson.projects).sort();
    }
}