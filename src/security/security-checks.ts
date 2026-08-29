export function assertSafePath(path: string): void {
  if (!path || path.includes('\0')) throw new Error('Unsafe file path');
}
