import { spawn } from 'node:child_process';

export async function runCommand(command: string, args: string[]): Promise<number> {
  return await new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: false, env: process.env });
    child.on('error', reject);
    child.on('exit', (code, signal) => {
      if (signal) resolve(1);
      else resolve(code ?? 1);
    });
  });
}
