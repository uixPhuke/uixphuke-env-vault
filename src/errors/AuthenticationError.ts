import { EnvVaultError } from './EnvVaultError.js';

export class AuthenticationError extends EnvVaultError {
  constructor(message = 'Authentication failed') {
    super(message);
    this.name = 'AuthenticationError';
  }
}
