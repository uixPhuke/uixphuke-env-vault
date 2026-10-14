import { encrypt } from '../core/encrypt.js';
import { decrypt } from '../core/decrypt.js';
import { readVault } from './vault-reader.js';
import { writeVault } from './vault-writer.js';
import type { VaultFile } from './vault-format.js';

export async function createVault(plaintext: string, password: string): Promise<VaultFile> {
  return { format: 'env-vault', ...(await encrypt(plaintext, password)) };
}

export async function openVault(path: string, password: string): Promise<string> {
  return decrypt(await readVault(path), password);
}

export { readVault, writeVault };
