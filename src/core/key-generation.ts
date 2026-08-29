import { randomBytes } from 'node:crypto';

export function generateKey(bytes = 32): string {
  if (![16, 24, 32].includes(bytes)) {
    throw new RangeError('Key size must be 16, 24, or 32 bytes');
  }
  return randomBytes(bytes).toString('base64url');
}
