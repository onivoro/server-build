import { Command } from 'nest-commander';
import { shell } from '../functions/shell.function';
import { AbstractAppCommand } from './abstract-app.command';
import { IAppParams } from '../types/app-params.interface';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

@Command({ name: OpenapiGen.name })
export class OpenapiGen extends AbstractAppCommand<IAppParams> {
  constructor() {
    super(OpenapiGen.name);
  }

  async main(_args: string[], { app }: IAppParams): Promise<void> {
    const appRootName = app.replace('api-', '');
    const generator = 'typescript-axios';
    const folder = 'api-dox';
    const dir = `libs/generated/${appRootName}/src/lib`;
    shell(
      [
        `rm -rf ${dir}`,
        `mkdir -p ${dir}`,
        `docker run --rm -v ${resolve(process.cwd())}:/local openapitools/openapi-generator-cli:v6.3.0 generate -i local/${folder}/${app}.json -g ${generator} -o local/${dir}`,
      ].join(' && ')
    );

    const generatedBaseFile = `${dir}/base.ts`;
    const contents = await readFile(generatedBaseFile, 'utf-8');
    const target = 'name: "RequiredError" = "RequiredError";';
    await writeFile(
      generatedBaseFile,
      contents.replace(target, `override ${target}`),
      'utf-8'
    );
  }
}
