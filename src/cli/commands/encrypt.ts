import { readFile } from 'node:fs/promises';
import { createVault } from '../../vault/vault.js';
import { writeVault } from '../../vault/vault-writer.js';
import { promptPassword } from '../prompts/password.js';

export async function encryptCommand(input = '.env', output = '.env.vault'): Promise<void> {
  const plaintext = await readFile(input, 'utf8');
  const password = await promptPassword();
  if (!password) throw new Error('Password cannot be empty');
  await writeVault(output, await createVault(plaintext, password));
  console.log(`Encrypted ${input} -> ${output}`);
}
