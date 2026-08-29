import { mkdir, writeFile, rename } from 'node:fs/promises';
import { dirname } from 'node:path';
import type { VaultFile } from './vault-format.js';

export async function writeVault(path: string, vault: VaultFile): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  const temp = `${path}.tmp-${process.pid}-${Date.now()}`;
  await writeFile(temp, `${JSON.stringify(vault, null, 2)}\n`, { encoding: 'utf8', mode: 0o600 });
  await rename(temp, path);
}
