export function parseEnv(input: string): Record<string, string> {
  const result: Record<string, string> = {};

  for (const rawLine of input.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) {
      continue;
    }

    const match = line.match(
      /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/,
    );

    if (!match) {
      continue;
    }

    const key = match[1];
    let value = match[2] ?? '';

    if (!key) {
      continue;
    }

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r');
  }

  return result;
}