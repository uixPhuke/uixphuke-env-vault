export function injectProcessEnv(
  values: Record<string, string>,
  options: { override?: boolean } = {},
): void {
  for (const [key, value] of Object.entries(values)) {
    if (options.override || process.env[key] === undefined) process.env[key] = value;
  }
}
