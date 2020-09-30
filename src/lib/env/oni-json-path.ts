import { Env } from '@onivoro/server-parameterization';

export class OniJsonPath extends Env<string> {
    id = () => 'oniJsonPath'
}