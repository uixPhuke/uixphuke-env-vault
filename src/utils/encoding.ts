export function base64UrlEncode(value: Buffer): string {
  return value.toString('base64url');
}

export function base64UrlDecode(value: string): Buffer {
  return Buffer.from(value, 'base64url');
}
