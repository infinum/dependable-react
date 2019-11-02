import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default [
  {
    input: './src/index.ts',
    output: [{ file: pkg.module, format: 'es' }],
    external: ['react'],
    plugins: [
      typescript({
        check: true,
        typescript: require('typescript'),
        tsconfig: './tsconfig.build.json',
      }),
    ],
  },
  {
    input: './src/index.ts',
    output: [{ file: pkg.main, format: 'cjs' }],
    external: ['react'],
    plugins: [
      typescript({
        check: true,
        typescript: require('typescript'),
        tsconfig: './tsconfig.build.json',
      }),
      terser({ toplevel: true }),
    ],
  },
];
