export function logElapsedTime(start: Date, programName: string) {
  console.log(`${programName} finished in ${+new Date() - +start} ms`);
}
