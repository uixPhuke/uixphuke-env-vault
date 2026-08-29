# Security Policy

Do not report vulnerabilities publicly. Please use GitHub Security Advisories or the
private security contact configured for this repository.

Security principles:
- Never log plaintext secret values.
- Never invent cryptographic primitives.
- Use Node.js `crypto` primitives only.
- Vault authentication failures must not reveal which secret or cryptographic field failed.
- Changes to the vault format require a version bump and compatibility tests.

This project is security-sensitive. Before production deployment, review the implementation,
threat model, dependencies, CI, and operational key-management process.
