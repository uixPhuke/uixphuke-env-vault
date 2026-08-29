export function assertNonEmpty(value: string, name: string): void {
  if (!value) throw new Error(`${name} cannot be empty`);
}
