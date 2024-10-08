import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import terser, { Options } from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import * as path from 'node:path';
// import * as fs from 'node:fs/promises';

// https://vitejs.dev/config https://vitest.dev/config

// You can use config below to generate files in path of plugin.
// const outputDir = 'D:/dev/sandbox/obdev/.obsidian/plugins/set-the-path-for-you';
//
// function copyManifestPlugin() {
//   return {
//     name: 'copy-manifest',
//     async closeBundle() {
//       try {
//         await fs.copyFile('manifest.json', path.join(outputDir, 'manifest.json'));
//         console.log('manifest.json has been copied to the output directory.');
//       } catch (error) {
//         console.error('Failed to copy manifest.json:', error);
//       }
//     },
//   };
// }

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      react(),
      // copyManifestPlugin(),
    ],
    build: {
      sourcemap: command !== 'build' || mode === 'development',
      minify: command === 'build' && mode !== 'development',
      // Use Vite lib mode https://vitejs.dev/guide/build.html#library-mode
      lib: {
        entry: path.resolve(__dirname, './src/index.ts'),
        formats: ['cjs'],
      },
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (warning.code === 'SOURCEMAP_ERROR') {
            return;
          }

          defaultHandler(warning);
        },
        plugins: [
          command !== 'build' || mode === 'development'
            ? ''
            : terser({
                compress: {
                  defaults: false,
                  drop_console: ['log', 'info'],
                },
                mangle: {
                  eval: true,
                  module: true,
                  toplevel: true,
                  safari10: true,
                  properties: false,
                },
                output: {
                  comments: false,
                  ecma: '2020',
                },
              } as unknown as Options),
          resolve({
            browser: false,
          }),
          replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          }),
        ],
        output: {
          // Overwrite default Vite output fileName
          entryFileNames: command === 'build' && mode !== 'development' ? 'main.js' : 'main.js',
          assetFileNames: command === 'build' && mode !== 'development' ? 'styles.css' : 'styles.css',
        },
        external: [
          'obsidian',
          'electron',
          '@codemirror/autocomplete',
          '@codemirror/collab',
          '@codemirror/commands',
          '@codemirror/language',
          '@codemirror/lint',
          '@codemirror/search',
          '@codemirror/state',
          '@codemirror/view',
          '@lezer/common',
          '@lezer/highlight',
          '@lezer/lr',
        ],
      },
      // Use root as the output dir
      emptyOutDir: false,
      // outDir: outputDir,
      outDir: '.',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  } as UserConfig;
});
