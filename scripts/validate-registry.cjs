const fs = require('fs')
const path = require('path')

console.log('🔍 Validating Cooki UI Registry and Architecture...')

const rootDir = path.resolve(__dirname, '..')
const registryDir = path.join(rootDir, 'registry')
const publicRDir = path.join(rootDir, 'public', 'r')
const rootRegistryPath = path.join(rootDir, 'registry.json')

let errors = 0
let warnings = 0

// 1. Check registry root file
if (!fs.existsSync(rootRegistryPath)) {
  console.error('❌ Missing root registry.json')
  errors++
} else {
  try {
    const reg = JSON.parse(fs.readFileSync(rootRegistryPath, 'utf8'))
    if (!reg.items || !Array.isArray(reg.items)) {
      console.error('❌ registry.json items array missing or invalid')
      errors++
    } else {
      console.log(`✓ registry.json verified with ${reg.items.length} items`)
    }
  } catch (e) {
    console.error('❌ Failed to parse registry.json:', e.message)
    errors++
  }
}

// 2. Check public/r/ endpoints
if (!fs.existsSync(publicRDir)) {
  console.error('❌ Missing public/r directory')
  errors++
}

// 3. Check each component in registry/
const categories = fs.readdirSync(registryDir).filter(f => fs.statSync(path.join(registryDir, f)).isDirectory())
const seenSlugs = new Set()

categories.forEach(cat => {
  const catDir = path.join(registryDir, cat)
  const components = fs.readdirSync(catDir).filter(f => fs.statSync(path.join(catDir, f)).isDirectory())

  components.forEach(comp => {
    // Duplicate check
    if (seenSlugs.has(comp)) {
      console.error(`❌ Duplicate component slug detected: "${comp}"`)
      errors++
    }
    seenSlugs.add(comp)

    const compDir = path.join(catDir, comp)
    const metadataPath = path.join(compDir, 'metadata.json')
    const srcPath = path.join(compDir, `${comp}.tsx`)
    const demoPath = path.join(compDir, 'demo.tsx')
    const endpointPath = path.join(publicRDir, `${comp}.json`)

    // Verify source exists
    if (!fs.existsSync(srcPath)) {
      console.error(`❌ Missing source file: ${srcPath}`)
      errors++
    }

    // Verify demo exists
    if (!fs.existsSync(demoPath)) {
      console.warn(`⚠️ Warning: Demo file missing for ${comp}`)
      warnings++
    }

    // Verify metadata exists and is valid
    if (!fs.existsSync(metadataPath)) {
      console.error(`❌ Missing metadata.json for ${comp}`)
      errors++
    } else {
      try {
        const meta = JSON.parse(fs.readFileSync(metadataPath, 'utf8'))
        if (!meta.name || !meta.title || !meta.type || !meta.files) {
          console.error(`❌ Incomplete metadata for ${comp}`)
          errors++
        }
      } catch (e) {
        console.error(`❌ Invalid metadata JSON in ${comp}:`, e.message)
        errors++
      }
    }

    // Verify public endpoint JSON exists
    if (!fs.existsSync(endpointPath)) {
      console.error(`❌ Missing public/r/${comp}.json endpoint`)
      errors++
    } else {
      try {
        const ep = JSON.parse(fs.readFileSync(endpointPath, 'utf8'))
        if (!ep.files || !ep.files[0] || !ep.files[0].content) {
          console.error(`❌ Missing raw source content in public/r/${comp}.json`)
          errors++
        }
      } catch (e) {
        console.error(`❌ Corrupted JSON in public/r/${comp}.json`)
        errors++
      }
    }
  })
})

console.log('\n--- Registry Validation Summary ---')
console.log(`Total Canonical Components Checked: ${seenSlugs.size}`)
console.log(`Errors: ${errors}`)
console.log(`Warnings: ${warnings}`)

if (errors > 0) {
  console.error('\n❌ Registry validation FAILED.')
  process.exit(1)
} else {
  console.log('\n✅ Registry validation PASSED cleanly!')
}
