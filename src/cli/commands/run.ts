import { loadSecrets } from '../../runtime/load-secrets.js';
import { runCommand } from '../../runtime/run-command.js';

export async function runCommandCli(args: string[]): Promise<number> {
  const separator = args.indexOf('--');
  const commandArgs = separator >= 0 ? args.slice(separator + 1) : args;
  if (!commandArgs.length) throw new Error('Usage: env-vault run -- <command> [args...]');
  await loadSecrets();
  return runCommand(commandArgs[0]!, commandArgs.slice(1));
}
