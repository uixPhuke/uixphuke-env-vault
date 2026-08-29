import { describe, expect, it } from 'vitest';
import { encrypt } from '../../src/core/encrypt.js';
import { decrypt } from '../../src/core/decrypt.js';

describe('tampering', () => {
  it('rejects modified authentication tag', async () => {
    const payload = await encrypt('A=B', 'password');

    const tag = Buffer.from(payload.tag, 'base64url');

    // Flip an actual bit in the authentication tag.
    tag[0] = tag[0]! ^ 0x01;

    payload.tag = tag.toString('base64url');

    await expect(decrypt(payload, 'password')).rejects.toThrow();
  });
});