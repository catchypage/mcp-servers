const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

/**
 * MCP client bundles + per-app Tailwind CSS (same idea as authorization-app
 * build-mcp.cjs). Bump MCP_WIDGET_ASSETS_VERSION when changing widgets/CSS.
 */
function buildMcpClients() {
  if (process.env.VERCEL === '1' || process.env.CI === 'true') {
    console.log('⏭️  Skipping MCP build on CI/Vercel')
    return
  }

  console.log('🔨 Building MCP client bundles...')

  const repoRoot = path.join(__dirname, '..')
  const publicMcpDir = path.join(repoRoot, 'public/mcp')
  if (!fs.existsSync(publicMcpDir)) {
    fs.mkdirSync(publicMcpDir, { recursive: true })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const tunnelUrl =
    process.env.TUNNEL_URL ?? 'https://resume.a.pinggy.online'

  const components = [
    {
      name: 'Resume',
      entry: '../components/mcp/resume/resume-entry.tsx',
      output: 'resume.bundle.js',
      stylesCss: 'resume-styles.css',
      tailwindContent: './components/mcp/resume/**/*.{tsx,ts}',
    },
    {
      name: 'ChefPlan',
      entry: '../components/mcp/chefplan/chefplan-entry.tsx',
      output: 'chefplan.bundle.js',
      stylesCss: 'chefplan-styles.css',
      tailwindContent: './components/mcp/chefplan/**/*.{tsx,ts}',
    },
    {
      name: 'LangCoach',
      entry: '../components/mcp/langcoach/langcoach-entry.tsx',
      output: 'langcoach.bundle.js',
      stylesCss: 'langcoach-styles.css',
      tailwindContent: './components/mcp/langcoach/**/*.{tsx,ts}',
    },
    {
      name: 'ChefPlan2',
      entry: '../components/mcp/nutri/nutri-entry.tsx',
      output: 'chefplan2.bundle.js',
      stylesCss: 'chefplan2-styles.css',
      tailwindContent: './components/mcp/nutri/**/*.{tsx,ts}',
    },
    {
      name: 'MoviePick',
      entry: '../components/mcp/moviepick/moviepick-entry.tsx',
      output: 'moviepick.bundle.js',
      stylesCss: 'moviepick-styles.css',
      tailwindContent: './components/mcp/moviepick/**/*.{tsx,ts}',
    },
    {
      name: 'GamePick',
      entry: '../components/mcp/gamepick/gamepick-entry.tsx',
      output: 'gamepick.bundle.js',
      stylesCss: 'gamepick-styles.css',
      tailwindContent: './components/mcp/gamepick/**/*.{tsx,ts}',
    },
  ]

  components.forEach((comp) => {
    try {
      console.log(`\n🔧 Building ${comp.name}...`)

      const entryPath = path.join(__dirname, comp.entry)
      const outputPath = path.join(publicMcpDir, comp.output)

      const buildCmd = [
        'npx esbuild',
        `"${entryPath}"`,
        '--bundle',
        '--format=esm',
        `--outfile="${outputPath}"`,
        '--loader:.tsx=tsx --loader:.ts=ts --loader:.jsx=jsx --loader:.js=js',
        '--jsx=automatic',
        `--define:process.env.NODE_ENV='"production"'`,
        `--define:process.env.NEXT_PUBLIC_SITE_URL='"${siteUrl}"'`,
        `--define:process.env.TUNNEL_URL='"${tunnelUrl}"'`,
        '--define:process.browser=true',
        '--define:global=globalThis',
        '--minify',
      ].join(' ')

      execSync(buildCmd, { stdio: 'inherit' })

      const size = (fs.readFileSync(outputPath, 'utf8').length / 1024).toFixed(1)
      console.log(`✅ ${comp.name} JS (${size} KB)`)
    } catch (err) {
      console.error(`❌ ${comp.name} failed:`, err.message)
      process.exit(1)
    }
  })

  const tailwindInput = path.join(__dirname, 'mcp-tailwind-input.css')
  const configPath = path.join(repoRoot, 'tailwind.config.js')

  console.log('\n🎨 Building MCP Tailwind CSS per app...')

  components.filter((comp) => comp.stylesCss && comp.tailwindContent).forEach((comp) => {
    try {
      const outCss = path.join(publicMcpDir, comp.stylesCss)
      const cmd = [
        'npx tailwindcss',
        `-c "${configPath}"`,
        `-i "${tailwindInput}"`,
        `-o "${outCss}"`,
        `--content "${comp.tailwindContent}"`,
        '--minify',
      ].join(' ')

      execSync(cmd, { cwd: repoRoot, stdio: 'inherit', shell: true })

      const cssKb = (fs.readFileSync(outCss, 'utf8').length / 1024).toFixed(1)
      console.log(`✅ ${comp.name} CSS → ${comp.stylesCss} (${cssKb} KB)`)
    } catch (err) {
      console.error(`❌ Tailwind ${comp.name} failed:`, err.message)
      process.exit(1)
    }
  })

  console.log('\n🎉 MCP clients built successfully!')
}

buildMcpClients()
