
import password from '@inquirer/password';

export async function promptPassword(
  label = 'Password: ',
  envVar = 'ENV_VAULT_PASSWORD',
): Promise<string> {
  const envValue = process.env[envVar];

  if (envValue !== undefined) {
    if (!envValue) {
      throw new Error(`${envVar} cannot be empty`);
    }

    return envValue;
  }

  return password({
    message: label.replace(/:\s*$/, ''),
    mask: '*',
  });
}

