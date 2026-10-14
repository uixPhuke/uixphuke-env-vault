import { chmod, stat } from 'node:fs/promises';

export async function secureFile(path: string): Promise<void> {
  await chmod(path, 0o600);
}

export async function checkPrivateFile(path: string): Promise<boolean> {
  const info = await stat(path);
  return (info.mode & 0o077) === 0;
}
