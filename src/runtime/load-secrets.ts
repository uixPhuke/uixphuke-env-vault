import { parseEnv } from '../env/env-parser.js';
import { openVault } from '../vault/vault.js';
import { injectProcessEnv } from './process-env.js';

export async function loadSecrets(options: {
  vaultPath?: string;
  password?: string;
  override?: boolean;
} = {}): Promise<Record<string, string>> {
  const vaultPath = options.vaultPath ?? '.env.vault';
  const password = options.password ?? process.env.ENV_VAULT_PASSWORD;
  if (!password) throw new Error('Vault password is required');
  const plaintext = await openVault(vaultPath, password);
  const values = parseEnv(plaintext);
  injectProcessEnv(values, { override: options.override ?? false });
  return values;
}
