import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))

function fileFriendlyBuild() {
  return {
    name: 'file-friendly-build',
    apply: 'build',
    transform(code, id) {
      if (id.includes('node_modules')) return null
      if (!/\.[jt]sx?$/.test(id)) return null
      let next = code.replace(/url\((['"`])\/assets\//g, 'url($1./')
      next = next.replace(/(['"`])\/(assets|fonts)\//g, '$1./$2/')
      return next === code ? null : next
    },
    transformIndexHtml(html) {
      return html
        .replace(/<script>\s*if \(location\.protocol === 'file:'[\s\S]*?<\/script>/, '')
        .replace(/\s+crossorigin(="[^"]*")?/g, '')
        .replaceAll('type="module"', '')
        .replaceAll('rel="modulepreload"', 'rel="preload"')
    },
    closeBundle() {
      const assetsDir = join(rootDir, 'dist/assets')
      for (const name of readdirSync(assetsDir)) {
        if (!name.endsWith('.css')) continue
        const file = join(assetsDir, name)
        let css = readFileSync(file, 'utf8')
        css = css.replaceAll('url(/fonts/', 'url(../fonts/')
        css = css.replaceAll("url('/fonts/", "url('../fonts/")
        css = css.replaceAll('url("/fonts/', 'url("../fonts/')
        css = css.replaceAll('url(/assets/', 'url(./')
        css = css.replaceAll("url('/assets/", "url('./")
        css = css.replaceAll('url("/assets/', 'url("./')
        writeFileSync(file, css)
      }

      writeFileSync(
        join(rootDir, 'dist/index.html'),
        `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Heroic — Video Production Studio</title>
    <link rel="stylesheet" href="./assets/style.css">
  </head>
  <body>
    <div id="root"></div>
    <script src="./assets/app.js"></script>
  </body>
</html>
`,
      )
    },
  }
}

export default defineConfig(({ command }) => ({
  plugins: [react(), fileFriendlyBuild()],
  base: command === 'build' ? './' : '/',
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'Heroic',
        inlineDynamicImports: true,
        entryFileNames: 'assets/app.js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
}))
