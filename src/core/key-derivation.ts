import { scrypt as scryptCallback } from 'node:crypto';
import { CryptoError } from './crypto-errors.js';

export interface ScryptParams {
  N: number;
  r: number;
  p: number;
  maxmem: number;
}

export const DEFAULT_SCRYPT: ScryptParams = {
  N: 16384,
  r: 8,
  p: 1,
  maxmem: 64 * 1024 * 1024,
};

export async function deriveKey(
  password: string,
  salt: Buffer,
  options: ScryptParams = DEFAULT_SCRYPT,
): Promise<Buffer> {
  if (!password) {
    throw new CryptoError('Password cannot be empty');
  }

  try {
    const derivedKey = await new Promise<Buffer>((resolve, reject) => {
      scryptCallback(
        password,
        salt,
        32,
        {
          N: options.N,
          r: options.r,
          p: options.p,
          maxmem: options.maxmem,
        },
        (error, key) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(key);
        },
      );
    });

    return derivedKey;
  } catch (error) {
    throw new CryptoError('Key derivation failed', { cause: error });
  }
}