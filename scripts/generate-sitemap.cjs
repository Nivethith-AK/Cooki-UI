const fs = require('fs')
const path = require('path')

console.log('Generating sitemap.xml and robots.txt...')

const rootDir = path.resolve(__dirname, '..')
const registryPath = path.join(rootDir, 'registry.json')
const publicDir = path.join(rootDir, 'public')

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'))
const items = registry.items || []
const today = new Date().toISOString().split('T')[0]

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cooki-ui.vercel.app/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://cooki-ui.vercel.app/r/index.json</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`

items.forEach(item => {
  xml += `  <url>
    <loc>https://cooki-ui.vercel.app/r/${item.name}.json</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
})

xml += `</urlset>\n`

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8')
console.log(`Successfully generated public/sitemap.xml with ${items.length + 2} URLs!`)
