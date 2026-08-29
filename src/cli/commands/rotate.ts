
import { promptPassword } from '../prompts/password.js';
import { rotateVault } from '../../security/key-rotation.js';

export async function rotateCommand(path = '.env.vault'): Promise<void> {
  const oldPassword = await promptPassword(
    'Current password: ',
    'ENV_VAULT_PASSWORD',
  );

  const newPassword = await promptPassword(
    'New password: ',
    'NEW_PASSWORD',
  );

  if (!newPassword) {
    throw new Error('New password cannot be empty');
  }

  if (newPassword === oldPassword) {
    throw new Error(
      'New password must be different from the current password',
    );
  }

  const confirmation = await promptPassword(
    'Confirm new password: ',
    'NEW_PASSWORD_CONFIRM',
  );

  if (newPassword !== confirmation) {
    throw new Error('New passwords do not match');
  }

  await rotateVault(path, oldPassword, newPassword);

  console.log('Vault key rotated successfully.');
}

