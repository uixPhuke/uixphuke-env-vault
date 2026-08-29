function quote(value: string): string {
  if (/^[A-Za-z0-9_./:@%+=,-]+$/.test(value)) return value;
  return JSON.stringify(value);
}

export function stringifyEnv(values: Record<string, string>): string {
  return Object.entries(values)
    .map(([key, value]) => `${key}=${quote(value)}`)
    .join('\n') + '\n';
}
