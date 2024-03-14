
import { readFile, writeFile } from 'fs/promises';

const encoding = 'utf-8';

export async function mapDotEnvFileForTerraform(file: string) {

    if (!file) {
        console.log(`mapDotEnvFileForTerraform => must pass file path`);
        return process.exit(1);
    }

    try {
        const raw = await readFile(file, { encoding });

        const lines = raw.split('\n').filter(Boolean).map(l => l.trim()).filter(Boolean);

        const applicableLines = lines.filter(l => l.includes('=') && l[0] !== '#');

        const updatedLines = applicableLines.map(l => `export TF_VAR_${l}`);

        const outputFilePath = `${file}-tf`;

        await writeFile(outputFilePath, updatedLines.join('\n'), { encoding });

        return outputFilePath;

    } catch (error) {
        console.log(error);
        return process.exit(1);
    }
}