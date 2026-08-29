import { CURRENT_VAULT_VERSION } from './vault-version.js';
import type { VaultFile } from './vault-format.js';

export function validateVault(value: unknown): asserts value is VaultFile {
  if (!value || typeof value !== 'object') throw new Error('Invalid vault');
  const v = value as Record<string, unknown>;
  if (
    v.format !== 'env-vault' ||
    v.version !== CURRENT_VAULT_VERSION ||
    v.algorithm !== 'aes-256-gcm' ||
    v.kdf !== 'scrypt' ||
    typeof v.salt !== 'string' ||
    typeof v.nonce !== 'string' ||
    typeof v.ciphertext !== 'string' ||
    typeof v.tag !== 'string' ||
    !v.kdfParams ||
    typeof v.kdfParams !== 'object'
  ) throw new Error('Invalid vault format');
}
