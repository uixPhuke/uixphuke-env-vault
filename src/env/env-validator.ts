export function validateEnv(values: Record<string, string>): void {
  for (const key of Object.keys(values)) {
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
      throw new Error(`Invalid environment variable name: ${key}`);
    }
  }
}
