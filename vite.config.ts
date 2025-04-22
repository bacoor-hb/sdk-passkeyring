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
      include: ['lib'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('/lib', ''),
        content,
      }),
      insertTypesEntry: true, // auto tạo "types" field trong package.json nếu dùng
    }),
  ],
  build: {
    target: 'es2022',
    lib: {
      entry: resolve('lib', 'main.tsx'),
      name: 'MyPasskeyWalletSDK',
      fileName: (format) => `main.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'viem'],
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
    target: 'es2022', // hoặc 'es2020' là đủ
  },
  optimizeDeps: {
    include: ['viem'], // Đảm bảo Vite pre-bundle viem
  },
}))
