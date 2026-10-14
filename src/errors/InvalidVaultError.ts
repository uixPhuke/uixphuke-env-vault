import { EnvVaultError } from './EnvVaultError.js';

export class InvalidVaultError extends EnvVaultError {
  constructor(message = 'Invalid vault') {
    super(message);
    this.name = 'InvalidVaultError';
  }
}
