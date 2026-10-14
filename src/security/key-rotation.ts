import { readVault } from '../vault/vault-reader.js';
import { writeVault } from '../vault/vault-writer.js';
import { createVault } from '../vault/vault.js';

export async function rotateVault(
  path: string,
  oldPassword: string,
  newPassword: string,
): Promise<void> {
  const oldVault = await readVault(path);
  const { decrypt } = await import('../core/decrypt.js');
  const plaintext = await decrypt(oldVault, oldPassword);
  const newVault = await createVault(plaintext, newPassword);
  await writeVault(path, newVault);
}
