import { readVault } from '../../vault/vault-reader.js';
import { checkPrivateFile } from '../../security/permissions.js';

export async function statusCommand(path = '.env.vault'): Promise<void> {
  const vault = await readVault(path);
  const privateFile = await checkPrivateFile(path).catch(() => false);
  console.log(`Format: ${vault.format}`);
  console.log(`Version: ${vault.version}`);
  console.log(`Algorithm: ${vault.algorithm}`);
  console.log(`KDF: ${vault.kdf}`);
  console.log(`Permissions: ${privateFile ? 'private' : 'review file permissions'}`);
}
