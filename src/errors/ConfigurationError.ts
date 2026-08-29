import { EnvVaultError } from './EnvVaultError.js';

export class ConfigurationError extends EnvVaultError {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}
