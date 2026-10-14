import { openVault } from '../../vault/vault.js';
import { writeFile } from 'node:fs/promises';
import { promptPassword } from '../prompts/password.js';

export async function decryptCommand(input = '.env.vault', output = '.env'): Promise<void> {
  const password = await promptPassword();
  const plaintext = await openVault(input, password);
  await writeFile(output, plaintext, { mode: 0o600 });
  console.log(`Decrypted ${input} -> ${output}`);
}
