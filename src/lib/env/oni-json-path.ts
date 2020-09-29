import { Env, Parameter } from '@onivoro/server-parameterization';

@Env(String)
export class OniJsonPath extends Parameter<string> {
}