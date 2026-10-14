import type { EncryptedPayload } from '../core/encrypt.js';

export interface VaultFile extends EncryptedPayload {
  format: 'env-vault';
}
