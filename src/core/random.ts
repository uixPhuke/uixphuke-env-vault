import { randomBytes } from 'node:crypto';

export function randomBytesSafe(size: number): Buffer {
  if (!Number.isInteger(size) || size <= 0) throw new RangeError('Invalid random byte size');
  return randomBytes(size);
}
