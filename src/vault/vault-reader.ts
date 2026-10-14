import { readFile } from 'node:fs/promises';
import { validateVault } from './vault-validator.js';
import type { VaultFile } from './vault-format.js';

export async function readVault(path: string): Promise<VaultFile> {
  const raw = await readFile(path, 'utf8');
  let value: unknown;
  try { value = JSON.parse(raw); } catch { throw new Error('Vault file is not valid JSON'); }
  validateVault(value);
  return value;
}
