declare const __ENV_VAULT_VERSION__: string;

export const VERSION = __ENV_VAULT_VERSION__;

export function versionCommand(): void {
  console.log(VERSION);
}