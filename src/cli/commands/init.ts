import { generateKey } from '../../core/key-generation.js';
import { writeFile, chmod } from 'node:fs/promises';

export async function initCommand(): Promise<void> {
  const key = generateKey(32);
  await writeFile('.env-vault-key', `${key}\n`, { mode: 0o600 });
  await chmod('.env-vault-key', 0o600);
  console.log('Created .env-vault-key. Keep it outside source control and back it up securely.');
}
