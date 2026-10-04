const fs = require('fs')
const path = require('path')

console.log('Building source-first registry artifacts and API endpoints...')

const rootDir = path.resolve(__dirname, '..')
const registryDir = path.join(rootDir, 'registry')
const publicRDir = path.join(rootDir, 'public', 'r')

fs.mkdirSync(publicRDir, { recursive: true })

const categories = fs.readdirSync(registryDir).filter(f => fs.statSync(path.join(registryDir, f)).isDirectory())
const registryItems = []

categories.forEach(cat => {
  const catDir = path.join(registryDir, cat)
  const components = fs.readdirSync(catDir).filter(f => fs.statSync(path.join(catDir, f)).isDirectory())

  components.forEach(comp => {
    const compDir = path.join(catDir, comp)
    const metadataPath = path.join(compDir, 'metadata.json')
    const srcPath = path.join(compDir, `${comp}.tsx`)

    if (!fs.existsSync(metadataPath) || !fs.existsSync(srcPath)) {
      console.warn(`Skipping ${comp}: metadata or source missing`)
      return
    }

    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'))
    const sourceCode = fs.readFileSync(srcPath, 'utf8')

    // Attach raw source content into files array
    const registryItem = {
      ...metadata,
      files: metadata.files.map(f => ({
        ...f,
        content: sourceCode
      }))
    }

    // Write individual /r/[name].json endpoint
    const endpointPath = path.join(publicRDir, `${comp}.json`)
    fs.writeFileSync(endpointPath, JSON.stringify(registryItem, null, 2))

    registryItems.push(registryItem)
  })
})

// Write master registry index to public/r/index.json
fs.writeFileSync(path.join(publicRDir, 'index.json'), JSON.stringify(registryItems, null, 2))

// Write root registry.json for shadcn & CLI consumption
const rootRegistry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'cooki-ui',
  homepage: 'https://cooki-ui.vercel.app',
  items: registryItems.map(item => ({
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    category: item.category,
    dependencies: item.dependencies,
    files: item.files.map(f => ({ path: f.path, type: f.type, target: f.target }))
  }))
}

fs.writeFileSync(path.join(rootDir, 'registry.json'), JSON.stringify(rootRegistry, null, 2))

// Sync component sources into frontend TS map
require('./sync-component-sources.cjs')

// Regenerate AI documentation
require('./generate-ai-docs.cjs')

console.log(`Successfully built registry API with ${registryItems.length} endpoints in public/r/ and root registry.json!`)
