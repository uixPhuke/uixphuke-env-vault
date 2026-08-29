import { defineConfig } from 'tsup';
import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
) as { version: string };

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'cli/index': 'src/cli/index.ts',
  },

  format: ['esm'],

  target: 'node20',

  dts: true,

  sourcemap: true,

  clean: true,

  splitting: false,

  banner: {
    js: '#!/usr/bin/env node',
  },

  outDir: 'dist',

  treeshake: true,

  minify: false,

  skipNodeModulesBundle: true,

  define: {
    __ENV_VAULT_VERSION__: JSON.stringify(packageJson.version),
  },
});