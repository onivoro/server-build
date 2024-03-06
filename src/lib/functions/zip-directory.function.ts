const AdmZip = require('adm-zip');

export async function zipDirectory(inputDir: string, outputFile: string) {
  const zip = new AdmZip();
  zip.addLocalFolder(inputDir);
  console.log(`Creating ${outputFile}`);
  return await new Promise((res, rej) =>
    zip.writeZip(outputFile, (error?: any) => {
      if (error) {
        rej(error);
      } else {
        console.log(`Created ${outputFile} successfully`);
        res(outputFile);
      }
    })
  );
}
