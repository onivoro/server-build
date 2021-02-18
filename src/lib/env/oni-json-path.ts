import { Env, Parameter } from '@onivoro/server-parameterization';
@Env(String, 'ONI_JSON_PATH')
export class OniJsonPath extends Parameter<string> {
}
