import { encryptCommand } from './commands/encrypt.js';
import { decryptCommand } from './commands/decrypt.js';
import { initCommand } from './commands/init.js';
import { runCommandCli } from './commands/run.js';
import { rotateCommand } from './commands/rotate.js';
import { statusCommand } from './commands/status.js';
import { versionCommand } from './commands/version.js';
import { printError } from './output/errors.js';

const HELP = `env-vault

Secure encrypted environment variables for Node.js.

Usage:
  env-vault <command> [options]

Commands:
  init                    Create a new vault
  encrypt [input] [output] Encrypt .env into a vault
  decrypt [input] [output] Decrypt a vault into .env
  run -- <command> [args] Run a command with secrets loaded
  rotate                  Change the vault password
  status                  Show vault information
  version                 Show version

Options:
  -h, --help              Show help
  -v, --version           Show version

Examples:
  env-vault encrypt
  env-vault decrypt
  env-vault run -- node server.js
  env-vault rotate
  env-vault status
`;

const COMMAND_HELP: Record<string, string> = {
  init: `env-vault init

Create a new encrypted environment vault.

Usage:
  env-vault init
`,

  encrypt: `env-vault encrypt

Encrypt an environment file into a vault.

Usage:
  env-vault encrypt [input] [output]

Defaults:
  input:  .env
  output: .env.vault
`,

  decrypt: `env-vault decrypt

Decrypt a vault into an environment file.

Usage:
  env-vault decrypt [input] [output]

Defaults:
  input:  .env.vault
  output: .env
`,

  run: `env-vault run

Run a command with decrypted secrets injected into the environment.

Usage:
  env-vault run -- <command> [args...]

Password:
  ENV_VAULT_PASSWORD can be used in CI/CD.
`,

  rotate: `env-vault rotate

Change the password protecting the vault.

Usage:
  env-vault rotate [vault]

Default:
  .env.vault
`,

  status: `env-vault status

Inspect the vault without decrypting its secrets.

Usage:
  env-vault status [vault]

Default:
  .env.vault
`,

  version: `env-vault version

Show the installed env-vault version.
`,
};

function showHelp(command?: string): void {
  if (command && COMMAND_HELP[command]) {
    console.log(COMMAND_HELP[command]);
    return;
  }

  console.log(HELP);
}

function isHelp(value: string | undefined): boolean {
  return value === '--help' || value === '-h';
}

function isVersion(value: string | undefined): boolean {
  return value === '--version' || value === '-v';
}

async function main(): Promise<void> {
  const [command, ...args] = process.argv.slice(2);

  // Global help/version must be handled before any command execution.
  if (isHelp(command)) {
    showHelp();
    return;
  }

  if (isVersion(command)) {
    return versionCommand();
  }

  // Command-specific help must never trigger password prompts.
  if (command && isHelp(args[0])) {
    showHelp(command);
    return;
  }

  switch (command) {
    case 'init':
      return initCommand();

    case 'encrypt':
      return encryptCommand(
        args[0] ?? '.env',
        args[1] ?? '.env.vault',
      );

    case 'decrypt':
      return decryptCommand(
        args[0] ?? '.env.vault',
        args[1] ?? '.env',
      );

    case 'run':
      process.exitCode = await runCommandCli(args);
      return;

    case 'rotate':
      return rotateCommand(args[0] ?? '.env.vault');

    case 'status':
      return statusCommand(args[0] ?? '.env.vault');

    case 'version':
      return versionCommand();

    case undefined:
      showHelp();
      return;

    default:
      throw new Error(
        `Unknown command: ${command}\n\nRun "env-vault --help" for usage.`,
      );
  }
}

main().catch((error) => {
  printError(error);
  process.exitCode = 1;
});