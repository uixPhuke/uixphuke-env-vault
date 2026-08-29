# Getting Started

1. Install `env-vault`.
2. Create a `.env`.
3. Run `npx env-vault encrypt`.
4. Keep the password/key outside Git.
5. In production, inject `ENV_VAULT_PASSWORD` from your deployment secret store.
6. Run your application with `npx env-vault run -- node server.js`.

Never commit plaintext `.env` files or the vault password.
