export function printError(error: unknown): void {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.error(`env-vault: ${message}`);
}
