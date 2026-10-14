export interface KeyProvider {
  getPassword(): Promise<string>;
}

export class EnvironmentKeyProvider implements KeyProvider {
  async getPassword(): Promise<string> {
    const value = process.env.ENV_VAULT_PASSWORD;
    if (!value) throw new Error('ENV_VAULT_PASSWORD is not set');
    return value;
  }
}
