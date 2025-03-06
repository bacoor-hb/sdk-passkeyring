import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'

export default defineConfig(configEnv => ({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ['lib/main.tsx'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('/lib', ''),
        content,
      }),
    }),
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: resolve('lib', 'main.tsx'),
      name: 'ReactFeatureFlag',
      fileName: (format) => `main.${format}.js`,
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
    minify: 'terser', // Minify the output
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
      },
    },
  },
  define: {
    self: 'globalThis', // Provide a fallback for `self`
  },
  esbuild: {
    // jsxInject: 'import React from \'react\'',
  },
}))
