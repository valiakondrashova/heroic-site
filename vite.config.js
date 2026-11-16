import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cpSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))

const builtPage = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Heroic — Video Production Studio</title>
    <link rel="stylesheet" href="./assets/style.css?v=20261116">
  </head>
  <body>
    <div id="root"></div>
    <script src="./assets/app.js?v=20261116"></script>
  </body>
</html>
`

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

      writeFileSync(join(rootDir, 'dist/index.html'), builtPage)
      rmSync(join(rootDir, 'assets'), { recursive: true, force: true })
      rmSync(join(rootDir, 'fonts'), { recursive: true, force: true })
      cpSync(join(rootDir, 'dist/assets'), join(rootDir, 'assets'), { recursive: true })
      cpSync(join(rootDir, 'dist/fonts'), join(rootDir, 'fonts'), { recursive: true })
      writeFileSync(join(rootDir, 'index.html'), builtPage)
    },
  }
}

function devEntry() {
  return {
    name: 'dev-entry',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const [path, query] = (req.url || '').split('?')
        const asset = path.startsWith('/@') || path.startsWith('/src/') || path.startsWith('/node_modules/') || path.startsWith('/assets/') || path.startsWith('/fonts/')
        if (!asset && !/\.[a-z0-9]+$/i.test(path)) {
          req.url = `/src/entry.html${query ? `?${query}` : ''}`
        }
        next()
      })
    },
  }
}

export default defineConfig(({ command }) => ({
  plugins: [devEntry(), react(), fileFriendlyBuild()],
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
      input: join(rootDir, 'src/entry.html'),
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
