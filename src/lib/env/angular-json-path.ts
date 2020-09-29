import { Env, Parameter } from '@onivoro/server-parameterization';

@Env(String)
export class AngularJsonPath extends Parameter<string> {
}