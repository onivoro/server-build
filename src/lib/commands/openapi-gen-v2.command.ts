import { Command, Option } from 'nest-commander';
import { shell } from '../functions/shell.function';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { AbstractCommand } from './abstract.command';

type IParams = {
  generator: string,
  input: string,
  output: string,
}

@Command({ name: OpenapiGenV2.name })
export class OpenapiGenV2 extends AbstractCommand<IParams> {
  constructor() {
    super(OpenapiGenV2.name);
  }

  async main(_args: string[], { generator, input, output }: IParams): Promise<void> {
    shell(
      [
        `rm -rf ${output}`,
        `mkdir -p ${output}`,
        `docker run --rm -v ${resolve(process.cwd())}:/local openapitools/openapi-generator-cli:v6.3.0 generate -i local/${input} -g ${generator} -o local/${output}`,
      ].join(' && ')
    );

    const generatedBaseFile = `${output}/base.ts`;
    const contents = await readFile(generatedBaseFile, 'utf-8');
    const target = 'name: "RequiredError" = "RequiredError";';
    await writeFile(
      generatedBaseFile,
      contents.replace(target, `override ${target}`),
      'utf-8'
    );
  }

  @Option({
    flags: '-g, --generator [generator]',
    description: 'Example: "typescript-angular" or "typescript-axios" (or any one of the options listed at https://openapi-generator.tech/docs/generators).',
    required: true
  })
  parseGen(val?: string) {
    return val;
  }

  @Option({
    flags: '-i, --input [input]',
    description: 'Relative path to OpenApi spec FILE to be used as input for generation.',
    required: true
  })
  parseInput(val?: string) {
    return val;
  }

  @Option({
    flags: '-o, --output [output]',
    description: 'Output DIRECTORY for the generated code. This DIRECTORY will be DELETED before generation.',
    required: true
  })
  parseOutput(val?: string) {
    return val;
  }
}
