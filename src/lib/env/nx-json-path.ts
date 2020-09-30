import { Env } from '@onivoro/server-parameterization';

export class NxJsonPath extends Env<string> {
    id = () => 'nxJsonPath'
}