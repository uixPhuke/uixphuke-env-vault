# Security

The v1 format uses AES-256-GCM with a 12-byte nonce and 16-byte authentication tag,
with a 32-byte key derived from a password using scrypt.

This protects confidentiality and integrity of vault contents at rest. It does not
protect a compromised runtime, a compromised host, or a leaked password.

A production deployment should use an external secret store for the master password
and should independently review this package before handling high-value secrets.
