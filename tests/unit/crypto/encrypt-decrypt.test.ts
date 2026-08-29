import { describe, expect, it } from 'vitest';
import { encrypt } from '../../../src/core/encrypt.js';
import { decrypt } from '../../../src/core/decrypt.js';

describe('crypto', () => {
  it('encrypts and decrypts', async () => {
    const payload = await encrypt('SECRET=hello', 'correct horse battery staple');
    expect(await decrypt(payload, 'correct horse battery staple')).toBe('SECRET=hello');
  });

  it('rejects a wrong password', async () => {
    const payload = await encrypt('SECRET=hello', 'one');
    await expect(decrypt(payload, 'two')).rejects.toThrow();
  });

  it('detects tampering', async () => {
    const payload = await encrypt('SECRET=hello', 'one');
    payload.ciphertext = payload.ciphertext.slice(0, -1) + 'A';
    await expect(decrypt(payload, 'one')).rejects.toThrow();
  });
});
