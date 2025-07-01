import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'browser.js',
    output: [
      {
        file: 'dist/devcraftor-sdk.cjs',
        format: 'cjs',
        name: 'DevCraftorSDK',
      },
      {
        file: 'dist/devcraftor-sdk.mjs',
        format: 'es',
      }
    ],
    plugins: [
      resolve({
        preferBuiltins: true,
        browser: false
      }),
      commonjs(),
      json()
    ],
    external: ['axios'] // Optional: Axios will be treated as external dependency
  }
];
