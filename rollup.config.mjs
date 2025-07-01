import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';


export default [
  // ✅ CommonJS and ESM builds
  {
    input: 'browser.js',
    output: [
      {
        file: 'dist/devcraftor-sdk.cjs',
        format: 'cjs',
      },
      {
        file: 'dist/devcraftor-sdk.mjs',
        format: 'es',
      }
    ],
    plugins: [
      resolve({ preferBuiltins: true, browser: false }),
      commonjs(),
      json()
    ],
    external: ['axios'] // ok for Node/Esm
  },

  // ✅ UMD Build for browser
  {
    input: 'browser.js',
    output: {
      file: 'dist/devcraftor-sdk.umd.js',
      format: 'umd',
      name: 'DevCraftorSDK', // This becomes window.DevCraftorSDK
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      json(),
      terser() // optional for minification
    ]
    // axios will be bundled — not external!
  }
];
