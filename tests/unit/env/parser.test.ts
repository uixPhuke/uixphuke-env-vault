import { describe, expect, it } from 'vitest';
import { parseEnv } from '../../../src/env/env-parser.js';
import { stringifyEnv } from '../../../src/env/env-writer.js';

describe('env parser', () => {
  it('parses common dotenv syntax', () => {
    expect(parseEnv('# comment\nPORT=3000\nNAME="hello world"\n')).toEqual({
      PORT: '3000',
      NAME: 'hello world',
    });
  });

  it('round trips common values', () => {
    const values = { A: 'hello world', B: 'simple', C: 'line\nbreak' };
    expect(parseEnv(stringifyEnv(values))).toEqual(values);
  });
});
