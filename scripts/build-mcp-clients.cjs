const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

/**
 * Build MCP client bundles (like authorization-app build-mcp.cjs).
 * Add new apps to components array.
 */
function buildMcpClients() {
  if (process.env.VERCEL === '1' || process.env.CI === 'true') {
    console.log('⏭️  Skipping MCP build on CI/Vercel')
    return
  }

  console.log('🔨 Building MCP client bundles...')

  const publicMcpDir = path.join(__dirname, '../public/mcp')
  if (!fs.existsSync(publicMcpDir)) {
    fs.mkdirSync(publicMcpDir, { recursive: true })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const tunnelUrl = process.env.TUNNEL_URL ?? siteUrl

  const components = [
    {
      name: 'Resume',
      entry: '../components/mcp/resume/resume-entry.tsx',
      output: 'resume.bundle.js',
    },
    {
      name: 'ChefPlan',
      entry: '../components/mcp/chefplan/chefplan-entry.tsx',
      output: 'chefplan.bundle.js',
    },
    // Add more: { name: 'Humanize', entry: '.../aihumanize/aihumanize-entry.tsx', output: 'aihumanize.bundle.js' },
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
      console.log(`✅ ${comp.name} built (${size} KB)`)
    } catch (err) {
      console.error(`❌ ${comp.name} failed:`, err.message)
      process.exit(1)
    }
  })

  console.log('\n🎉 MCP clients built successfully!')
}

buildMcpClients()
