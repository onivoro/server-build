import { Env, Parameter } from '@onivoro/server-parameterization';

@Env(String, 'ANGULAR_JSON_PATH')
export class AngularJsonPath extends Parameter<string> {
}
