import { Env, Parameter } from '@onivoro/server-parameterization';

@Env(String)
export class NxJsonPath extends Parameter<string> {
}