import { readFile } from 'node:fs/promises';
import { parseEnv } from './env-parser.js';

export async function loadEnvFile(path: string): Promise<Record<string, string>> {
  return parseEnv(await readFile(path, 'utf8'));
}
