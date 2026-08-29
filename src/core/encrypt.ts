import { createCipheriv } from 'node:crypto';
import { deriveKey, DEFAULT_SCRYPT } from './key-derivation.js';
import { randomBytesSafe } from './random.js';
import { CryptoError } from './crypto-errors.js';

export interface EncryptedPayload {
  version: 1;
  algorithm: 'aes-256-gcm';
  kdf: 'scrypt';
  salt: string;
  nonce: string;
  ciphertext: string;
  tag: string;
  kdfParams: { N: number; r: number; p: number };
}

export async function encrypt(
  plaintext: string,
  password: string,
): Promise<EncryptedPayload> {
  if (typeof plaintext !== 'string') throw new TypeError('Plaintext must be a string');
  const salt = randomBytesSafe(16);
  const nonce = randomBytesSafe(12);
  const key = await deriveKey(password, salt);
  try {
    const cipher = createCipheriv('aes-256-gcm', key, nonce);
    const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return {
      version: 1,
      algorithm: 'aes-256-gcm',
      kdf: 'scrypt',
      salt: salt.toString('base64url'),
      nonce: nonce.toString('base64url'),
      ciphertext: ciphertext.toString('base64url'),
      tag: tag.toString('base64url'),
      kdfParams: { N: DEFAULT_SCRYPT.N, r: DEFAULT_SCRYPT.r, p: DEFAULT_SCRYPT.p },
    };
  } catch (error) {
    throw new CryptoError('Encryption failed', { cause: error });
  } finally {
    key.fill(0);
  }
}
