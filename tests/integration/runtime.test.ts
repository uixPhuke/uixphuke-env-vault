import { describe, expect, it, afterEach } from 'vitest';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createVault } from '../../src/vault/vault.js';
import { writeVault } from '../../src/vault/vault-writer.js';
import { loadSecrets } from '../../src/runtime/load-secrets.js';

describe('runtime', () => {
  const previous = process.env.TEST_ENV_VAULT;
  afterEach(() => {
    if (previous === undefined) delete process.env.TEST_ENV_VAULT;
    else process.env.TEST_ENV_VAULT = previous;
  });

  it('loads secrets into process.env', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'env-vault-'));
    try {
      const path = join(dir, '.env.vault');
      await writeVault(path, await createVault('TEST_ENV_VAULT=works\n', 'pass'));
      await loadSecrets({ vaultPath: path, password: 'pass' });
      expect(process.env.TEST_ENV_VAULT).toBe('works');
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
