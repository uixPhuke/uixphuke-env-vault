import { DEFAULT_CONFIG } from './defaults.js';

export interface EnvVaultConfig {
  input: string;
  vault: string;
  override: boolean;
}

export function getConfig(overrides: Partial<EnvVaultConfig> = {}): EnvVaultConfig {
  return { ...DEFAULT_CONFIG, ...overrides };
}
