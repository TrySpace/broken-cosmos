/// <reference types="vitest" />
import path from 'path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

import { defineConfig, loadEnv, PluginOption } from 'vite'
import checker from 'vite-plugin-checker'
import circleDependency from 'vite-plugin-circular-dependency'
import eslintPlugin from "vite-plugin-eslint"
import removeConsole from 'vite-plugin-remove-console'

import svgr from 'vite-plugin-svgr'


export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const isProd = mode === 'production'
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // base: './', // This breaks build/deploy pathing
    plugins: [
      react(),
      tailwindcss(),
      svgr(),
      isProd
        ? undefined
        : checker({
          typescript: true,
        }),
    ],
    publicDir: 'public',
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        '@Config': path.resolve(__dirname, 'src/config'),
        '@Components': path.resolve(__dirname, 'src/components'),
        '@Routes': path.resolve(__dirname, 'src/routes'),
        '@Server': path.resolve(__dirname, 'src/server'),
        '@State': path.resolve(__dirname, 'src/state'),
        '@Styles': path.resolve(__dirname, 'src/styles'),
        '@Utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'src/index.tsx'),
          index: path.resolve(__dirname, 'index.html'),
          // shared: path.resolve(__dirname, 'src/shared/cube-core/src/index.js'),
        },
        output: {
          experimentalMinChunkSize: 20000,
          manualChunks: (id) => {
            if (id.includes('node_modules/@firebase')) {
              return 'firebase'
            }
            if (id.includes('node_modules/@udecode')) {
              return 'udecode'
            }
            if (id.includes('node_modules/@xyflow')) {
              return 'xyflow'
            }
            if (id.includes('node_modules/@visx')) {
              return 'visx'
            }
            if (id.includes('node_modules/ol')) {
              return 'ol'
            }
          },
          entryFileNames:
            mode === 'development' ? '[name].[hash].js' : '[hash].js',
          chunkFileNames:
            mode === 'development' ? '[name].[hash].js' : '[hash].js',
          assetFileNames:
            mode === 'development'
              ? '[name].[hash][extname]'
              : '[hash][extname]',
        },
      },
      outDir: isProd ? 'build' : 'dev',
      emptyOutDir: true,
      sourcemap: isProd ? false : true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      mockReset: false,
      include: ['**/*.test.ts', '**/*.test.tsx'],
    },
    define: {
      'process.env': env,
    },
  }
})
