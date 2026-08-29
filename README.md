# uixphuke-env-vault

> 🔐 Secure your Node.js environment variables with a simple encrypted vault workflow.

`uixphuke-env-vault` is a lightweight CLI utility for protecting `.env` configuration in Node.js projects.

It takes your normal plaintext `.env` file, encrypts it into `.env.vault`, and lets you decrypt or use those values at runtime through the standard Node.js `process.env` interface.

---

## 📦 Installation

Install the package with npm:

```bash
npm install uixphuke-env-vault
```

After installation, use the CLI with:

```bash
npx env-vault
```

---

# 🚀 Complete End-to-End Workflow

The complete workflow looks like this:

```text
                    LOCAL DEVELOPMENT
                           │
                           ▼
                    ┌─────────────┐
                    │    .env     │
                    │             │
                    │ DATABASE_URL│
                    │ JWT_SECRET  │
                    │ API_KEY     │
                    └──────┬──────┘
                           │
                           │ encrypt
                           ▼
                  ┌─────────────────┐
                  │    .env.vault   │
                  │                 │
                  │ Encrypted data  │
                  │ Password locked │
                  └────────┬────────┘
                           │
                           │ runtime
                           ▼
                  ┌─────────────────┐
                  │    env-vault    │
                  │                 │
                  │ decrypt safely  │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │    process.env  │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Node.js App     │
                  │ server.js       │
                  └─────────────────┘
```

The important idea is:

```text
.env
 ↓
encrypt
 ↓
.env.vault
 ↓
runtime/decrypt
 ↓
process.env
 ↓
Node.js application
```

---

# 1. Create Your `.env`

Start with your normal `.env` file.

Example:

```env
DATABASE_URL=postgres://localhost:5432/myapp
JWT_SECRET=my-super-secret-key
API_KEY=sk_live_example
PORT=3000
```

Your application can normally access these values:

```js
const databaseUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;
const apiKey = process.env.API_KEY;
const port = process.env.PORT;
```

At this stage:

```text
.env
```

contains the actual plaintext values.

### Important

`.env` contains sensitive information.

Do not expose or commit real credentials to a public repository.

---

# 2. Initialize env-vault

Run:

```bash
npx env-vault init
```

This initializes the env-vault workflow for your project.

Your project can then use the standard vault commands.

---

# 3. Encrypt `.env`

Once your `.env` is ready, run:

```bash
npx env-vault encrypt
```

The default workflow is:

```text
Input:

.env
  │
  │ encrypt
  ▼
Output:

.env.vault
```

So you have:

```text
your-project/
├── .env
├── .env.vault
├── server.js
└── package.json
```

---

# 🔐 `.env` vs `.env.vault`

This is the most important distinction.

## `.env`

`.env` is the readable/plaintext environment file.

Example:

```env
DATABASE_URL=postgres://localhost:5432/myapp
JWT_SECRET=my-super-secret-key
API_KEY=sk_live_example
PORT=3000
```

Anyone who can read this file can see the actual values.

---

## `.env.vault`

`.env.vault` contains the encrypted environment data.

Conceptually, it looks like protected/encrypted data rather than:

```env
DATABASE_URL=postgres://localhost:5432/myapp
JWT_SECRET=my-super-secret-key
API_KEY=sk_live_example
```

Instead, the vault contains encrypted information that cannot simply be read as normal environment variables.

```text
.env
   │
   │ encrypt
   ▼
.env.vault
```

### Comparison

| `.env` | `.env.vault` |
|---|---|
| Plaintext | Encrypted |
| Human-readable | Protected data |
| Contains actual values | Contains encrypted values |
| Used as the source environment | Used as protected storage |
| Sensitive | Designed for safer storage |

---

# 4. What Happens During Encryption?

When you run:

```bash
npx env-vault encrypt
```

env-vault reads your `.env` values.

For example:

```env
DATABASE_URL=postgres://localhost:5432/myapp
JWT_SECRET=my-super-secret-key
API_KEY=sk_live_example
```

The values are protected and stored in:

```text
.env.vault
```

The conceptual transformation is:

```text
PLAINTEXT ENVIRONMENT

DATABASE_URL=postgres://...
JWT_SECRET=my-super-secret-key
API_KEY=sk_live_example

              │
              │
              ▼

        ENV-VAULT ENCRYPTION

              │
              ▼

ENCRYPTED VAULT

.env.vault
```

The original `.env` is not magically made unreadable.

Instead, env-vault creates a protected encrypted representation in `.env.vault`.

---

# 5. Decrypt `.env.vault`

If you need to recover the plaintext `.env`, run:

```bash
npx env-vault decrypt
```

The default workflow is:

```text
.env.vault
     │
     │ decrypt
     ▼
   .env
```

After successful decryption, your environment file can be restored:

```env
DATABASE_URL=postgres://localhost:5432/myapp
JWT_SECRET=my-super-secret-key
API_KEY=sk_live_example
PORT=3000
```

### Use decrypt when:

- You need to inspect or edit environment values.
- You need to recover your `.env`.
- You are working locally and need the plaintext configuration.

After working with the plaintext file, consider encrypting it again:

```bash
npx env-vault encrypt
```

---

# 6. Run Your Node.js Application

You can run your application through env-vault:

```bash
npx env-vault run -- node server.js
```

The runtime workflow is:

```text
.env.vault
     │
     ▼
 env-vault
     │
     ▼
decrypt/recover environment
     │
     ▼
process.env
     │
     ▼
Node.js application
```

Your application does not need a custom secrets API.

It continues to use:

```js
process.env
```

For example:

```js
const databaseUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;

console.log(databaseUrl);
```

---

# 7. Runtime Example

Suppose `.env` contains:

```env
PORT=3000
DATABASE_URL=postgres://localhost:5432/myapp
JWT_SECRET=my-secret
```

After encryption:

```text
.env
.env.vault
```

Start your application:

```bash
npx env-vault run -- node server.js
```

Your `server.js` can remain normal Node.js code:

```js
const http = require("http");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.end("Application running");
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

The application still receives its environment values through:

```js
process.env
```

---

# 8. Run Other Commands

`run` is not limited to `node server.js`.

You can pass your normal application command after `--`.

### Node.js

```bash
npx env-vault run -- node server.js
```

### npm start

```bash
npx env-vault run -- npm start
```

### Another Node.js file

```bash
npx env-vault run -- node app.js
```

The general syntax is:

```bash
npx env-vault run -- <your-command>
```

---

# 🛠️ Complete CLI Command Reference

## Install

```bash
npm install uixphuke-env-vault
```

Installs env-vault into your project.

---

## Initialize

```bash
npx env-vault init
```

Initializes the vault workflow.

---

## Encrypt

```bash
npx env-vault encrypt
```

Encrypts:

```text
.env
```

into:

```text
.env.vault
```

Default:

```text
Input:  .env
Output: .env.vault
```

---

## Decrypt

```bash
npx env-vault decrypt
```

Decrypts:

```text
.env.vault
```

back into:

```text
.env
```

Default:

```text
Input:  .env.vault
Output: .env
```

---

## Run

```bash
npx env-vault run -- node server.js
```

Runs a command with the recovered environment available through:

```js
process.env
```

General syntax:

```bash
npx env-vault run -- <command>
```

---

## Rotate

```bash
npx env-vault rotate
```

Changes the password protecting an existing vault.

Use this when the vault password needs to be replaced.

Workflow:

```text
Existing .env.vault
        │
        ▼
     rotate
        │
        ▼
New protected vault
```

---

## Status

```bash
npx env-vault status
```

Displays vault metadata without exposing decrypted secret values.

Useful for checking vault information without printing your actual secrets.

---

## Version

```bash
npx env-vault version
```

Displays the installed env-vault CLI version.

---

## Help

```bash
npx env-vault --help
```

Displays available commands and usage information.

---

# 📋 All Commands at a Glance

| Command | Purpose |
|---|---|
| `npm install uixphuke-env-vault` | Install env-vault |
| `npx env-vault init` | Initialize the vault |
| `npx env-vault encrypt` | Encrypt `.env` → `.env.vault` |
| `npx env-vault decrypt` | Decrypt `.env.vault` → `.env` |
| `npx env-vault run -- node server.js` | Run application with environment values |
| `npx env-vault rotate` | Rotate vault password |
| `npx env-vault status` | View vault metadata |
| `npx env-vault version` | Show CLI version |
| `npx env-vault --help` | Show CLI help |

---

# 🚀 Recommended First-Time Setup

For a new Node.js project:

### Step 1 — Install

```bash
npm install uixphuke-env-vault
```

### Step 2 — Initialize

```bash
npx env-vault init
```

### Step 3 — Create `.env`

```env
DATABASE_URL=postgres://localhost:5432/myapp
JWT_SECRET=my-secret
API_KEY=your-api-key
```

### Step 4 — Encrypt

```bash
npx env-vault encrypt
```

### Step 5 — Run

```bash
npx env-vault run -- node server.js
```

Complete:

```text
Install
   ↓
Initialize
   ↓
Create .env
   ↓
Encrypt
   ↓
.env.vault
   ↓
Run
   ↓
process.env
   ↓
Node.js application
```

---

# 🔄 Daily Development Workflow

A typical development workflow can look like:

```text
             Start
               │
               ▼
        Do you have .env?
          │          │
         No         Yes
          │          │
          ▼          ▼
       decrypt    Continue
          │          │
          └────┬─────┘
               ▼
          Edit .env
               │
               ▼
       Encrypt environment
               │
               ▼
         .env.vault
               │
               ▼
       Run application
               │
               ▼
          process.env
```

Commands:

```bash
npx env-vault decrypt
```

Edit `.env`.

Then:

```bash
npx env-vault encrypt
```

Run:

```bash
npx env-vault run -- node server.js
```

---

# 📁 Recommended Project Structure

```text
your-project/
├── .env
├── .env.vault
├── .gitignore
├── package.json
├── server.js
└── node_modules/
```

Example:

```text
your-project/
│
├── .env              ← plaintext environment
│
├── .env.vault        ← encrypted environment
│
├── server.js         ← Node.js application
│
├── package.json      ← project configuration
│
└── node_modules/     ← dependencies
```

---

# 🔒 Git & `.env`

Your plaintext `.env` should generally not be committed to Git.

Add this to `.gitignore`:

```gitignore
.env
```

Example:

```gitignore
node_modules/
.env
```

The important rule is:

```text
Never commit real plaintext secrets.
```

That includes:

- Database passwords
- API keys
- JWT secrets
- Access tokens
- Private credentials
- Production passwords

---

# 🔐 Security Model

env-vault focuses on encrypted environment storage and a simple runtime workflow.

The main security concepts are:

## Encrypted at Rest

Environment data is stored in protected encrypted form inside `.env.vault`.

```text
.env
 ↓
encrypt
 ↓
.env.vault
```

---

## Password Protection

The vault is protected by a password.

The password is required to access the protected environment.

---

## Authentication

Invalid passwords or invalid/modified vault data should fail authentication rather than silently returning incorrect secrets.

---

## Password Rotation

You can change the password protecting the vault:

```bash
npx env-vault rotate
```

---

## Runtime Environment

Your Node.js application continues to use:

```js
process.env
```

You do not need to rewrite your application around a custom secrets API.

---

# 🤖 CI/CD

env-vault can also be used in automated environments.

Interactive password prompts are useful during local development, but automated deployment environments should provide the vault password securely.

Use:

```text
ENV_VAULT_PASSWORD
```

as the environment variable for the vault password.

Conceptually:

```text
CI/CD Secret Store
        │
        ▼
ENV_VAULT_PASSWORD
        │
        ▼
    env-vault
        │
        ▼
   .env.vault
        │
        ▼
 Node.js application
        │
        ▼
    process.env
```

The password should be configured using your CI/CD provider's secure secret storage.

Do not put it directly in:

```text
package.json
source code
.git repository
shell scripts committed to Git
```

---

# ⚙️ CI/CD Example

Once your CI/CD environment provides:

```text
ENV_VAULT_PASSWORD
```

your application can use:

```bash
npx env-vault run -- node server.js
```

The vault password stays outside the repository.

---

# 🔁 Complete Environment Lifecycle

The complete lifecycle can be summarized as:

```text
┌─────────────────────┐
│       .env          │
│                     │
│ DATABASE_URL=...    │
│ JWT_SECRET=...      │
│ API_KEY=...         │
└──────────┬──────────┘
           │
           │ encrypt
           ▼
┌─────────────────────┐
│     .env.vault      │
│                     │
│ encrypted data      │
│ password protected  │
└──────────┬──────────┘
           │
           │ run
           ▼
┌─────────────────────┐
│      env-vault      │
│                     │
│ runtime workflow    │
└──────────┬──────────┘
           │
           │ recover values
           ▼
┌─────────────────────┐
│     process.env     │
│                     │
│ DATABASE_URL        │
│ JWT_SECRET          │
│ API_KEY             │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Node.js App       │
│                     │
│ server.js           │
│ npm start           │
│ node app.js         │
└─────────────────────┘
```

---

# 🧠 Important Difference

It is important to understand that `.env` and `.env.vault` are not the same thing.

### `.env`

```text
Readable configuration
```

Example:

```env
API_KEY=123456
```

### `.env.vault`

```text
Encrypted/protected configuration
```

The secret values are not intended to be stored as readable plaintext.

Therefore:

```text
.env       = source plaintext
.env.vault = protected encrypted representation
```

---

# ❓ When Should I Use Each Command?

### I just installed env-vault

Use:

```bash
npx env-vault init
```

### I created or changed `.env`

Use:

```bash
npx env-vault encrypt
```

### I need to recover `.env`

Use:

```bash
npx env-vault decrypt
```

### I want to start my Node.js application

Use:

```bash
npx env-vault run -- node server.js
```

### I need to change the vault password

Use:

```bash
npx env-vault rotate
```

### I want to inspect vault information

Use:

```bash
npx env-vault status
```

### I want to see the installed version

Use:

```bash
npx env-vault version
```

### I need command documentation

Use:

```bash
npx env-vault --help
```

---

# 🪶 Why env-vault?

Traditional `.env` files are convenient, but they contain plaintext secrets.

env-vault adds a simple encrypted storage workflow:

```text
Normal .env workflow

.env
 ↓
plaintext secrets
 ↓
risk of accidental exposure


env-vault workflow

.env
 ↓
encrypt
 ↓
.env.vault
 ↓
protected storage
 ↓
runtime
 ↓
process.env
```

The goal is to provide protection without forcing your Node.js application to adopt a completely different environment API.

---

# 🧩 Works With Existing Node.js Code

You can keep using:

```js
process.env.DATABASE_URL
```

```js
process.env.JWT_SECRET
```

```js
process.env.API_KEY
```

Your application remains familiar.

env-vault handles the environment workflow around it.

---

# 📦 Package Information

Package:

```text
uixphuke-env-vault
```

Install:

```bash
npm install uixphuke-env-vault
```

CLI:

```bash
npx env-vault
```

---

# 👨‍💻 Developer

Built by **Ruhon Borah**.

Developer profile:

https://ruhon-dev.vercel.app

---

# ⚠️ Important Security Boundary

env-vault is a lightweight encrypted environment workflow.

It is **not a centralized cloud secret-management platform**.

You are still responsible for:

- Protecting the vault password
- Protecting plaintext `.env` files
- Protecting CI/CD credentials
- Rotating compromised secrets
- Configuring appropriate repository permissions
- Using secure infrastructure secret storage

For CI/CD, keep the vault password in your provider's secure secret store rather than inside the repository.

---

# 📄 License

See the project's `LICENSE` file for licensing information.

---

# ⭐ Summary

The simplest way to remember env-vault is:

```text
CREATE
  ↓
.env

ENCRYPT
  ↓
.env.vault

RUN
  ↓
process.env

APPLICATION
  ↓
Node.js
```

### The core commands

```bash
npm install uixphuke-env-vault

npx env-vault init

npx env-vault encrypt

npx env-vault decrypt

npx env-vault run -- node server.js

npx env-vault rotate

npx env-vault status

npx env-vault version

npx env-vault --help
```

**Protect your environment. Keep your Node.js workflow simple.**
