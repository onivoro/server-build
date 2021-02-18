import { Env, Parameter } from '@onivoro/server-parameterization';

@Env(String, 'NX_JSON_PATH')
export class NxJsonPath extends Parameter<string> {
}
