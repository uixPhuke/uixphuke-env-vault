import { createDecipheriv } from 'node:crypto';
import { deriveKey } from './key-derivation.js';
import { CryptoError } from './crypto-errors.js';
import type { EncryptedPayload } from './encrypt.js';

function decode(value: string): Buffer {
  return Buffer.from(value, 'base64url');
}

export async function decrypt(
  payload: EncryptedPayload,
  password: string,
): Promise<string> {
  if (payload.version !== 1 || payload.algorithm !== 'aes-256-gcm' || payload.kdf !== 'scrypt') {
    throw new CryptoError('Unsupported vault format');
  }

  const salt = decode(payload.salt);
  const nonce = decode(payload.nonce);
  const ciphertext = decode(payload.ciphertext);
  const tag = decode(payload.tag);

  if (salt.length !== 16 || nonce.length !== 12 || tag.length !== 16) {
    throw new CryptoError('Invalid encrypted payload');
  }

  const key = await deriveKey(password, salt, {
    N: payload.kdfParams.N,
    r: payload.kdfParams.r,
    p: payload.kdfParams.p,
    maxmem: 64 * 1024 * 1024,
  });

  try {
    const decipher = createDecipheriv('aes-256-gcm', key, nonce);
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return plaintext.toString('utf8');
  } catch (error) {
    throw new CryptoError('Authentication failed or vault data is corrupted', { cause: error });
  } finally {
    key.fill(0);
  }
}
